import matplotlib.pyplot as plt
import math
from make_predictions import get_specific_data

def plot_past_and_future(historical_data, future_data, mls_id, address):
    xpoints_past = []
    xpoints_future = []
    past_data = get_specific_data(historical_data, mls_id)
    
    max_future = max(future_data)
    max_past = max(past_data)
    min_future = min(future_data)
    min_past = min(future_data)
    
    for i in range((len(past_data) -1) * -1,1):
        xpoints_past.append(i)
    for i in range(1,len(future_data) +1):
        xpoints_future.append(i)
    
    plt.figure(figsize=(10, 5))
    
    plt.plot(xpoints_past, past_data, color='#0955E3', label= 'Historical Prices')
    plt.plot(xpoints_future, future_data, color='green', label= 'Predicted Prices')
    plt.legend()
    
    plt.title('Predictions for Address ' + address, color= 'white')
    plt.xlabel('Months into the Future', color= 'white')
    plt.ylabel('Predicted Price in USD', color= 'white')
    
    yref_min = int((min(min_future, min_past) // 100000) * 100000)
    yref_max = int(math.ceil(max(max_future, max_past) / 100000.0)) * 100000
    yref_step = int((yref_max - yref_min) / 8)
    
    plt.xticks(range(min(xpoints_past), max(xpoints_future)+1, 12), color = 'white')    
    plt.yticks(range(yref_min, yref_max, yref_step), color = 'white')
    
    plt.gcf().set_facecolor('black')
    plt.gca().set_facecolor('#d3d3d3')  
    
    plt.savefig(str(mls_id) + 'plot.png', bbox_inches='tight')


