import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler


def predict_future_prices_linearreg(mls_number, grouped_data, num_months):
    mls_data = grouped_data.get_group(mls_number)
    X = mls_data[['Year', 'Month']].values
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    model = LinearRegression()
    model.fit(X_scaled, mls_data['Price'])  # Include Price as the target variable
    
    future_prices = {}
    
    for i in range(1, num_months + 1):
        future_year = mls_data['Year'].max() + (i + mls_data['Month'].max() - 1) // 12
        future_month = (mls_data['Month'].max() + i) % 12 or 12  # Handles the rollover of months
        future_date = [[future_year, future_month]]

        future_date_scaled = scaler.transform(future_date)

        future_price = model.predict(future_date_scaled)[0]
        future_prices[str(i)] = future_price
    
    return future_prices

def data_processing(historical_data_preprocessing):
    historical_data = historical_data_preprocessing

    historical_data['Date'] = pd.to_datetime(historical_data['Date'])

    historical_data['Year'] = historical_data['Date'].dt.year
    historical_data['Month'] = historical_data['Date'].dt.month
    historical_data['MLS#'] = historical_data['MLS#'].astype(str)
    grouped_data = historical_data.groupby('MLS#')

    return grouped_data