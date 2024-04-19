import make_predictions
import pandas as pd
df = pd.read_csv(str(input()))
predictions = make_predictions.predict_future_prices('24000510', df)
print(predictions)
