import axios from "axios"

/* Сервис для запроса с помощью axios  */
export const httpRequest = (data = {},url) => 
{
    return axios.post(url,data)
}

export default httpRequest