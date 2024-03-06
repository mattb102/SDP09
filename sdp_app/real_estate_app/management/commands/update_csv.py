import requests
import json
import csv
from io import StringIO


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
    print(session.cookies) 
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


def export_to_csv(response_text, file_path):
    with open(file_path, 'w', newline='') as csvfile:
            csvreader = csv.reader(StringIO(response_text))
            csvwriter = csv.writer(csvfile)
            for row in csvreader:
                csvwriter.writerow(row)

jsessionid = get_jsessionid()
ids = get_listing_ids(jsessionid)
export_link = (export_listings(jsessionid, ids))
response = requests.get("https://smartmls3.connectmls.com" + json.loads(export_link)['url'])
export_to_csv(response.text, './output.csv')
