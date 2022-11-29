import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsTypes): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            throw new Error(`i don't understand this action type`)
    }
}



export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    }
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title: title
    }
}

export const ChangeTodolistTitleAC = (title: string, todolistId: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title: title,
        id: todolistId
    }
}

export const ChangeTodolistFilterAC = (filter: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        id: todolistId
    }
}
