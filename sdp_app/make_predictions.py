import numpy as np
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import TimeSeriesSplit
from sklearn.preprocessing import StandardScaler
import joblib
import csv
import matplotlib.pyplot as plt
import pickle
import linearregmodel as lrm

def get_specific_data(df, mls):
    # Filter the DataFrame for the given MLS#
    df['MLS#'] = df['MLS#'].astype(str)
    mls_df = df[df['MLS#'] == mls]    
    # Sort the filtered DataFrame by date
    mls_df_sorted = mls_df.sort_values(by='Date')
    # Extract prices and return as a list
    prices = mls_df_sorted['Price'].tolist()
    return prices
        
def predict_future_prices_xgboost(model, initial_features, steps, n_lags, seasonality_period=12):
    future_features = initial_features.copy()
    predictions = []
    
    # Adjust the parameters for the sine wave and linear trend
    period_multiplier = 1.5  # Adjust the period of the sine wave
    linear_factor = np.linspace(1, 5, len(initial_features) + steps)  # Adjust the range of the linear trend
    
    for step in range(steps):
        # Extract the lagged features
        lagged_features = future_features[-n_lags:]
        
        # Extract the month feature for seasonality
        month_feature = [(len(future_features) + step) % seasonality_period]  # Update month feature based on current position
        
        # Apply the sine wave with adjusted period and linear trend
        index = len(future_features) + step
        index %= len(linear_factor)  # Ensure index stays within bounds
        sine_wave = np.sin(2 * np.pi * index / (12.0 * period_multiplier))
        current_features = sine_wave * linear_factor[index]
        
        # Concatenate lagged features with the month feature
        current_features = np.concatenate((lagged_features, month_feature, [current_features]), axis=0)
        
        # Ensure the correct number of features
        expected_feature_length = model.feature_importances_.shape[0]
        current_features = np.pad(current_features, [(0, max(0, expected_feature_length - len(current_features)))], mode='constant')
        
        # Reshape the features for prediction
        current_features = np.array(current_features).reshape(1, -1)
        
        # Predict the price for the current features
        pred = model.predict(current_features[:, :expected_feature_length])[0]  # Limit features to expected length
        predictions.append(pred)
        
        # Update future features for the next prediction
        future_features = np.append(future_features, pred)
    
    return predictions


def predict_future_prices(target_mls_id, historical_data):   
    target_features = []
    target_lag = None
    model_num = 2
    try:
        xg_model = joblib.load(target_mls_id + 'xgboost_model.pkl')
        # Initialize variables to store features and lag
        with open('initial_features.csv', 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                if row:  # Check if row is not empty
                    mls_id = row[0]  # Assuming MLS ID is in the first column
                    if mls_id == target_mls_id:
                        # Extract features and lag
                        target_features = list(map(float, row[1:-1]))  # Features are from second column to second to last column
                        target_lag = int(row[-1])  # Lag is in the last column
                        break  # Exit loop once target MLS ID is found
    except Exception:
        model_num = 1       
        
    grouped_data = lrm.data_processing(historical_data)
    linearreg_predictions = lrm.predict_future_prices_linearreg(target_mls_id, grouped_data, 60)
    xgboost_predictions = []
    
    if model_num == 2:
        xgboost_predictions = predict_future_prices_xgboost(xg_model, target_features, 60, target_lag)
        averaged_predictions = []
     #   print(xgboost_predictions)
     #   print(linearreg_predictions)
        for i in range(60):
            averaged_predictions.append(round((xgboost_predictions[i] + linearreg_predictions[str(i + 1)])/2.0, 2))
    else:
        averaged_predictions = list(linearreg_predictions.values())
        
    prices_list = get_specific_data(historical_data, target_mls_id)
    
    shift = prices_list[-1] - averaged_predictions[0]
    for i in range(60):
        averaged_predictions[i] += shift
    
    return averaged_predictions
        