#-*- coding:utf-8 -*-
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import time
import os

driver = webdriver.Chrome('./chromedriver')
driver.implicitly_wait(5)

def main():
    place_list_1 = [
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=594',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=456',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=286',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=314',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=720'
    ]
    place_list_2 = [
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=831&pcate=11&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=779&pcate=11&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=784&pcate=11&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=851&pcate=11&smarket[0]=21&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=772&pcate=11&smarket[0]=22&pn=1'
    ]
    place_list_3 = [
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=747&pcate=3&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=739&pcate=3&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=728&pcate=3&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=720&pcate=3&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=833&pcate=3&smarket[0]=21&pn=1'
    ]
    place_list_4 = [
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=740&pcate=2&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=723&pcate=2&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=722&pcate=2&smarket[0]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=671&pcate=2&smarket[0]=22&pn=1'
    ]
    place_list_5 = [
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=848&pcate=6&smarket[0]=21&smarket[1]=22&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=818&pcate=5&pn=1',
        'http://stay.visitseoul.net/ko/02_room_view.html?fmuid=807&pcate=5&pn=1'
    ]
    
    result_data = []
    
    for url_ in place_list_4:
        print(url_)
        driver.get(url_)
        time.sleep(2)

        source = driver.page_source
        page = BeautifulSoup(source, 'lxml')
        
        section = page.find('div', class_='view-content').find_all('section')
        
        
        hanok_type = page.find('span', class_='cate color-grn').get_text().strip()
        name = page.find('div', class_='view-info').find('h2').get_text().strip()
        try:
            place = page.find('p', class_='loc').get_text().strip()
        except:
            place = ''
        address = page.find('p', class_='addr').get_text().strip()
        try:
            url = page.find('td', class_='site').find('a').get('href').strip()
        except:
            url = url_
        detail = section[0].find('p').get_text().strip()
        try:
            option = section[2].find('p').get_text().strip()
        except:
            option = ''
        transport = section[3].find('p').get_text().strip()
        
        result_data.append([name, hanok_type, place, address, detail, option, transport, url])
    
    data = pd.DataFrame(result_data, columns = ['name', 'type', 'place', 'address', 'detail', 'option', 'transport', 'url'])
    data = data.applymap(lambda x: x.replace('\xa0','').replace('\xa9',''))        
    data.to_csv('hanok.csv', encoding='utf-8', index=False)
        
        
main()
driver.quit()