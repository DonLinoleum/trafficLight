import jQuery from "jquery";

/* Функция, создающая несколько строк таблицы, исходя из поступивших данных */
export function createAndInsertTableRows(data,parentElement)
{
    data.data.forEach(element => 
    {
        createAndInsertOneRow(element,parentElement)  
    });
}

/* Функция, создающая одну строку таблицы, исходя из поступивших данных */
export function createAndInsertOneRow(oneObjectOfData,parentElement)
{
    let trElement = jQuery("<tr>")
    for (let key in oneObjectOfData)
        trElement.append(createTdElement(oneObjectOfData[key])) 
    parentElement.prepend(trElement)    
}

/* Функция, создающая элемент <td> и помещающая в него переданный текст */
function  createTdElement(text)
{
    return jQuery("<td>").text(text)
}