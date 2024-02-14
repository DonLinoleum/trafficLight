import './bootstrap';
import jQuery from 'jquery';
import { createAndInsertOneRow, createAndInsertTableRows } from './services/createTableRows';
import httpRequest from './services/httpRequest';
import { handleDataByState } from './state/mainState';
import { api_urls } from './apiUrls/apiUrls';
import { main_state } from './state/mainState';

const traffic_list =
    [ 
        {item: main_state.green_light, interval:5000},
        {item: main_state.yellow_light, interval: 2000},
        {item: main_state.red_light, interval:5000},
        {item: main_state.yellow_light, interval: 2000}
    ]

/* Главная функция, запускающая светофор   */
function mainTrafficLights()
{
    getLogsFromServer()
    changeLightWithInterval()
}  
mainTrafficLights()

/* Функция с запросом к серверу для получения имеющихся логов  */
async function getLogsFromServer()
{
    const result = await httpRequest({},api_urls.url_get_all_logs)
    createAndInsertTableRows(result.data,jQuery('.main_content__log table'))
}

/* Функция, запускающая логику по изменению цвета согласно установленным интервалам */
function changeLightWithInterval()
{
    if (main_state.index === traffic_list.length)
        main_state.index = 0
    addActiveToCurrentLight()
    setTimeout(changeLightWithInterval,traffic_list[main_state.index].interval)  
    main_state.index++ 
}

/* Логика установки css класса для обозначения активного цвета свеотофора */
function addActiveToCurrentLight()
{
    main_state.state_previous_light = jQuery(main_state.state_current_light)
    main_state.state_current_light = traffic_list[main_state.index].item 
    
    if (main_state.state_previous_light !== null)  
        main_state.state_previous_light.removeClass('traffic_light_item__active')

    if (main_state.state_current_light)
        main_state.state_current_light.addClass('traffic_light_item__active')
}

/* Обработчик нажатия на кнопку "Вперед" */
jQuery('.main_content__ui__button_wrapper button').on('click',async function()
{
    const logText = handleDataByState(main_state.state_current_light,main_state.state_previous_light)
    const data = JSON.stringify({"data": logText})
    const result = await httpRequest(data,api_urls.url_logs)
    createAndInsertOneRow(result.data.data,jQuery('.main_content__log table'))
})








