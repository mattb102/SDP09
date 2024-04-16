import numpy as np
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import TimeSeriesSplit
import joblib
import csv
import matplotlib.pyplot as plt

def predict_future_prices(model, initial_features, steps, n_lags, seasonality_period=12):
    future_features = np.array(initial_features.copy())
    predictions = []
    
    # Ensure future_features is one-dimensional
    if future_features.ndim > 1:
        future_features = future_features.squeeze()
    
    # Ensure the length of future_features is divisible by seasonality_period
    remainder = len(future_features) % seasonality_period
    if remainder != 0:
        future_features = future_features[:-remainder]
    
    # Calculate weighted average seasonal pattern
    try:
        seasonal_patterns = future_features.reshape(-1, seasonality_period)
        current_month = len(future_features) % seasonality_period
        weights = np.abs(np.arange(len(seasonal_patterns)) - current_month) + 1
        weighted_seasonal_pattern = np.average(seasonal_patterns, axis=0, weights=weights)
    except Exception as e:
        print("Error calculating weighted seasonal pattern:", e)
        raise
    
    for step in range(steps):
        # Extract the month feature from the weighted seasonal pattern
        month_feature = weighted_seasonal_pattern[step % seasonality_period]
        
        # Ensure the correct number of lagged features
        if len(future_features) > n_lags:
            future_features = future_features[-n_lags:]
        elif len(future_features) < n_lags:
            # If the number of lagged features is less, pad with zeros
            pad_length = n_lags - len(future_features)
            future_features = np.concatenate((np.zeros(pad_length), future_features))
        
        # Append the month feature to the future features
        future_features = np.append(future_features, month_feature)
        
        # Predict the price for the current features
        pred = model.predict(future_features.reshape(1,-1))[0]
        predictions.append(pred)
        
        # Update the lagged features for the next prediction
        future_features = np.roll(future_features, -1)
        future_features[-1] = pred
    
    return predictions

def predict(mls_num):
    target_mls_id = mls_num
    model = joblib.load(target_mls_id + 'xgboost_model.pkl')
    target_features = []
    target_lag = None

    with open('initial_features.csv', 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            if row:  # Check if row is not empty
                mls_id = row[0]  # Assuming MLS ID is in the second column
                if mls_id == target_mls_id:
                    # Extract features and lag
                    target_features = list(map(float, row[1:-1]))  # Features are from second column to second to last column
                    target_lag = int(row[-1])  # Lag is in the last column
                    break  # Exit loop once target MLS ID is found

    predictions = predict_future_prices(model, target_features, 60, target_lag)
    return predictions
