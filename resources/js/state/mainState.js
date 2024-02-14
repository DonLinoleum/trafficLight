import jQuery from "jquery"
/* Состояние приложения */
export const main_state = 
{
    green_light : jQuery('#green_light'),
    yellow_light : jQuery('#yellow_light'),
    red_light : jQuery('#red_light'),
    state_previous_light : null,
    state_current_light : green_light,
    index : 0
}

/* Обработака активного цвета светофора и выборка текста для записи лога */
export function handleDataByState(state,previous_state)
{
    switch(state)
    {
        case main_state.green_light:{
            return "Проезд на зеленый!"
        }
        case main_state.red_light:{
            return "Проезд на красный. Штраф!"
        }
        case main_state.yellow_light:{
            if (previous_state.is(main_state.green_light))
                return "Успели на желтый!"
            if (previous_state.is(main_state.red_light))
                return "Слишком рано начали движение!"
        }
    }
}