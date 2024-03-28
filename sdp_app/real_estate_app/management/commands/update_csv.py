import requests
import json
import csv
from io import StringIO
from bs4 import BeautifulSoup
import re
def get_jsessionid():
    sign_in_url = 'https://smartmls3.connectmls.com/servlet/SignIn?fromurl=slogin.jsp&userid=HOSKIERO&password=punkin%402023&screenHeight=1080&screenWidth=1920&visitorid=1709147497240'
    session = requests.Session()
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-site'
    }
    
    response = session.get(sign_in_url, headers=headers)
#    jsessionid_cookie = session.cookies.get('JSESSIONID')
    for cookie in session.cookies:
        if cookie.name == 'JSESSIONID' and cookie.domain == 'smartmls3.connectmls.com':
            return cookie.value
    return jsessionid_cookie

def get_listing_ids(jsessionid):
    url = 'https://smartmls3.connectmls.com/api/search/listing/download'

    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json;charset=utf-8',
        'Origin': 'https://smartmls3.connectmls.com',
        'Referer': 'https://smartmls3.connectmls.com/mls/search/search.jsp?switch_type=HOTSHEET&switch_class=SF_AND_CN&set_time=%7B%22timeframe%22:%22today%22,%22from_time%22:%22%22,%22to_time%22:%22%22,%22from_date%22:%22%22,%22to_date%22:%22%22,%22custom_days%22:%221%22%7D',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
    }

    cookies = {
        'JSESSIONID': jsessionid,
        'usertype': 'agent',
        '_ga': 'GA1.2.170796015.1709146815',
        '_gid': 'GA1.2.985985627.1709146813',
        '_ga_VMZ9SF2M89': 'GS1.1.1709146813.1.1.1709147011.50.0.1',
        'market-mm-days': '0',
        '_ga_HW3P4EWKRD': 'GS1.1.1709146825.1.1.1709147010.0.0.3',
        '_gat_gtag_UA_141161009_14': '1',
        '_gat_gtag_UA_132887259_1': '1'
    }

    data = {
    "searchtype": "LISTING",
    "searchclass": "SF_AND_CN",
    "boundaries": None,
    "fields": [
        {"ordinal": None, "id": "PROXIMITY_SEARCH", "value": None, "option": None, "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "MLSSTATUS", "value": "ACTV,CS", "option": None, "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "SEARCH_PRICE", "value": None, "option": None, "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "STATEORPROVINCE", "value": "CT", "option": "", "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "COUNTYORPARISH", "value": "", "option": "", "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "CITY", "value": "", "option": "", "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "DEFAULT_ADDRESS_SEARCH", "value": "", "option": None, "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "COMPLEXNAME", "value": "", "option": "", "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "SQFTESTHEATEDABOVEGRADE", "value": None, "option": None, "min": None, "max": None, "none": None, "all": None},
        {"ordinal": None, "id": "STYLE", "value": "", "option": "", "min": None, "max": None, "none": "", "all": ""}
    ],
    "layers": [],
    "sort": [{"field": "CITY", "direction": 1, "mark": True}],
    "record": True,
    "report": "agent-rd-table"
}


    response = requests.post(url, headers=headers, cookies=cookies, json=data)
    response_dict = json.loads(response.text)

    ids_list = response_dict["ids"]
    return(ids_list)

def export_listings(jsessionid, ids):
    url = 'https://smartmls3.connectmls.com/api/listing/mylistings/export'
    headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json;charset=utf-8',
        'Origin': 'https://smartmls3.connectmls.com',
        'Connection': 'keep-alive',
        'Referer': 'https://smartmls3.connectmls.com/mls/search/search.jsp?switch_type=HOTSHEET&switch_class=SF_AND_CN&set_time=%7B%22timeframe%22:%22today%22,%22from_time%22:%22%22,%22to_time%22:%22%22,%22from_date%22:%22%22,%22to_date%22:%22%22,%22custom_days%22:%221%22%7D',
        'Cookie': f'JSESSIONID={jsessionid}; usertype=agent; _ga_VMZ9SF2M89=GS1.1.1709147516.1.1.1709149440.56.0.0; _ga=GA1.2.1006630583.1709147516; _gid=GA1.2.2038227903.1709147519; market-mm-days=0; _ga_HW3P4EWKRD=GS1.1.1709148132.1.0.1709149440.0.0.0; _gat_gtag_UA_141161009_14=1; _gat_gtag_UA_132887259_1=1',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    }
    data = {
        "dcids": ids,
        "category": "SF_AND_CN",
        "searchtype": "HOTSHEET",
        "report": "listingreport",
        "subtype": "094A669CCE90F14DE0631401100A3EDC",
        "type": "CSV",
        "download_photos": ""
    }
    data_json = json.dumps(data)
    response = requests.post(url, headers=headers, data=data_json)
    return response.text



def fetch_image_url(property_id, jsession_id):
    url = f'https://smartmls.connectmls.com/mls/search/results/photodetail.jsp?dcid={property_id}&category=SF_AND_CN&searchtype=HOTSHEET&report=agent-rd-details&i=smartmls-connectmls-6.5.1.2.1#/'

    headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:123.0) Gecko/20100101 Firefox/123.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Cookie': f'visitorid=1711573287321; sheight=1080; swidth=1920; _ga_VMZ9SF2M89=GS1.1.1711641348.2.1.1711642720.39.0.0; _ga=GA1.2.718869216.1711573294; _gid=GA1.2.1421516360.1711573294; _ga_HW3P4EWKRD=GS1.1.1711573299.1.0.1711573299.0.0.0; JSESSIONID={jsession_id}; X-Oracle-BMC-LBS-Route=73842aec02bc6473d090cb61e0d06e250adb768e27da03a11a2ff120e313e9b656c62fd8a7c42ae8c07eacdbb98185dae65b414c33fe62987aa45054',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1'
}
      


    cookies = {
        'JSESSIONID': jsessionid,
        'usertype': 'agent',
        '_ga': 'GA1.2.170796015.1709146815',
        '_gid': 'GA1.2.985985627.1709146813',
        '_ga_VMZ9SF2M89': 'GS1.1.1709146813.1.1.1709147011.50.0.1',
        'market-mm-days': '0',
        '_ga_HW3P4EWKRD': 'GS1.1.1709146825.1.1.1709147010.0.0.3',
        '_gat_gtag_UA_141161009_14': '1',
        '_gat_gtag_UA_132887259_1': '1',
        'visitorid' : '1234567'
    }

    response = requests.get(url, headers=headers, cookies=cookies)
    if response.status_code == 200:                                                     
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')                               
        script_tags = soup.find_all('script')                                           
        for script_tag in script_tags:                                                  
            script_text = script_tag.get_text()                                         
            if 'window.photo_data' in script_text:                                      
                photo_links = re.findall(r'href:\'(.*?)\'', script_text)                
                if photo_links:
                    return(photo_links[0])                                               
                    break
    else:                                                                               
        print("Request error.")


def export_to_csv(response_text, file_path, image_urls):
    with open(file_path, 'w', newline='') as csvfile:
            csvreader = csv.reader(StringIO(response_text))
            csvwriter = csv.writer(csvfile)
            image_url_index = -1
            for row in csvreader:
                if image_url_index == -1:
                    row.insert(0, "Image")
                    csvwriter.writerow(row)
                else:
                    row.insert(0, image_urls[image_url_index])
                    csvwriter.writerow(row)
                image_url_index = image_url_index + 1

jsessionid = get_jsessionid()
ids = get_listing_ids(jsessionid)[0:5]
image_urls = []
for index, id in enumerate(ids):
    if index == 10:
        jsessionid = get_jsessionid()
    image_url = fetch_image_url(id, jsessionid)
    while(image_url == None):
        image_url = fetch_image_url(id, jsessionid)
    image_urls.append(image_url)
print(len(image_urls))
export_link = (export_listings(jsessionid, ids))
response = requests.get("https://smartmls3.connectmls.com" + json.loads(export_link)['url'])
export_to_csv(response.text, './output.csv', image_urls)
