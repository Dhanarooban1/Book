import { ADD_CONTENT } from "./actiontype";
import {REDUX_INPUT_TEXT} from "./actiontype"

export const add_content = (payload)=>{
    return {type:ADD_CONTENT,payload }
}

export const redux_input_text = (payload) =>{
    return {type:REDUX_INPUT_TEXT,payload}
}
