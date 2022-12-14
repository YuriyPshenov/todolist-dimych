import {createStore, combineReducers} from 'redux';
import {tasksReducer} from "./TasksReducer";
import {todolistsReducer} from "./todolists-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore
window.store = store;
