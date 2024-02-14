import { ADD_CONTENT } from "./actiontype";
import { REDUX_INPUT_TEXT } from "./actiontype";

const initialState ={
    content:[],
    UserInputText:" "
}
export const reducerFunction = (state=initialState,action) =>{

    switch(action.type){
        case ADD_CONTENT:
            return {...state,content:action.payload}
        case REDUX_INPUT_TEXT:
            return {...state,UserInputText:action.payload}
            default:
                 return state
    }

}


export default reducerFunction;