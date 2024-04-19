import pandas as pd
import numpy as np
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import TimeSeriesSplit
import joblib
import csv


def add_noise(X_train, noise_level):
    # Generate random noise with the same shape as X_train
    noise = np.random.normal(scale=noise_level, size=X_train.shape)
    # Add noise to the original training data
    X_train_noisy = X_train + noise
    return X_train_noisy

def create_lags(dataset, n_lags):
    for lag in range(1, n_lags + 1):
        dataset[f'lag_{lag}'] = dataset['Price'].shift(lag)
    return dataset.dropna()

def grid_search_parameters_with_early_stopping(data, lag_options, decay_options, early_stopping_rounds, lm):
    best_mse = float('inf')
    best_lag = None
    best_decay = None
    
    for n_lags in lag_options:
        data_with_lags = create_lags(data.copy(), n_lags)
        X = data_with_lags.drop('Price', axis=1)
        y = data_with_lags['Price']
        
        tscv = TimeSeriesSplit(n_splits=3)
        
        try:
            for train_index, test_index in tscv.split(X):
                X_train, X_test = X.iloc[train_index], X.iloc[test_index]
                y_train, y_test = y.iloc[train_index], y.iloc[test_index]
            
                for decay_factor in decay_options:
                    n = len(X_train)
                    weights = np.exp(np.linspace(-decay_factor * n, 0, n))
                
                    # Define early stopping callback
                    early_stopping = [(X_test, y_test)]
                
                    if lm == 0:
                        model = XGBRegressor(n_estimators=100, learning_rate=0.05, objective='reg:squarederror')
                        model.set_params(early_stopping_rounds=10)
                        model.fit(X_train, y_train, sample_weight=weights,
                                  eval_set=early_stopping, verbose=False)
                
                        predictions = model.predict(X_test)
                    else:
                        lm.set_params(early_stopping_rounds=10)
                        lm.fit(X_train, y_train, sample_weight=weights,
                                         eval_set=early_stopping, verbose=False)
                
                        predictions = lm.predict(X_test)
                    
                    mse = mean_squared_error(y_test, predictions)
                
                    if mse < best_mse:
                        best_mse = mse
                        best_lag = n_lags
                        best_decay = decay_factor
        except Exception as e:
            return 12, 0
        return best_lag, best_decay
    

def build_xgboost_models(historical_data):
    df = pd.read_csv(historical_data)  # Update with the correct path
    df['MLS#'] = df['MLS#'].astype(str)
    unique_mls_ids = df['MLS#'].unique().tolist()
    
    initial_features_all = []
    best_lag_all = []

    for unique_id in unique_mls_ids:
    
        try:
            # Try to load the model from the file
            loaded_model = joblib.load(unique_id + 'xgboost_model.pkl')
            print("Model loaded successfully!")
            # Use the loaded model for further processing
            # For example:
                # loaded_model.predict(X_test)
        except FileNotFoundError:
            print("Model file not found. Model not loaded.")
            loaded_model = 0
                    # Handle the case where the model file is not found
        except Exception as e:
            print(f"An error occurred while loading the model: {e}")
            loaded_model = 0
    
        if loaded_model != 0:
            model_final = loaded_model
        else:
            model_final = XGBRegressor(n_estimators=100, learning_rate=0.05, objective='reg:squarederror')
        try:
            house_data = df[df['MLS#'] == unique_id][['Date', 'Price']]
            house_data['Date'] = pd.to_datetime(house_data['Date'])
            house_data.set_index('Date', inplace=True)
            house_data = house_data.asfreq('MS').fillna(method='ffill')
            linear_factor = np.linspace(1, 5, len(house_data))  # Adjust the range of values as needed
            house_data['month_sin_linear'] = np.sin(2 * np.pi * house_data.index.month / 12.0) * linear_factor
        except Exception as e:
            continue
    
        # Perform grid search with early stopping

        lag_options = range(12, 37, 6)  # From 12 to 36, stepping by 6
        decay_options = np.linspace(0.01, 0.1, 10)  # Decay factors
        best_lag, best_decay = grid_search_parameters_with_early_stopping(house_data[['Price', 'month_sin_linear']], lag_options, decay_options, early_stopping_rounds=10, lm=loaded_model)

        print(f"Optimal n_lags: {best_lag}, Optimal Decay Factor: {best_decay}")

        # Re-train the model with the best parameters and early stopping
        house_data_with_lags = create_lags(house_data, best_lag)
        X_final = house_data_with_lags.drop('Price', axis=1)
        y_final = house_data_with_lags['Price']
    
        if len(X_final) == 0:
            continue
    
        n_final = len(X_final)
        weights_final = np.exp(np.linspace(-best_decay * n_final, 0, n_final))

        # Define early stopping callback for final training
        early_stopping_final = [(X_final, y_final)]        
        
        model_final.set_params(early_stopping_rounds=10)

        model_final.fit(X_final, y_final, sample_weight=weights_final,
                        eval_set=early_stopping_final, verbose=False)


        # Specify the noise level
        noise_level = 0.5  # Adjust this value according to your needs

    # Add noise to the training data
        X_final_noisy = add_noise(X_final, noise_level)

    # Retrain the model with noisy data
        model_final.fit(X_final_noisy, y_final, sample_weight=weights_final,
                        eval_set=early_stopping_final, verbose=False)
    
        initial_features_all.append(X_final.iloc[-1].values)
        best_lag_all.append(best_lag)
        joblib.dump(model_final, unique_id + 'xgboost_model.pkl')
        with open('initial_features.csv', 'w+') as f:
            writer = csv.writer(f)
            for ids, features, lag in zip(unique_mls_ids, initial_features_all, best_lag_all):
                writer.writerow([ids] + features.tolist() + [lag])
data = str(input())
build_xgboost_models(data)