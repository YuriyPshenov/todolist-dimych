import {TasksStateType} from "../AppWithReducers";
import {v1} from "uuid";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask ,...state[action.payload.todolistId]]}
        }
        case 'REMOVE_TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.id)}
        }
        case 'CHANGE_TASK_STATUS': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {...t, isDone: action.payload.isDone} : t)}
        }
        case 'CHANGE_TASK_TITLE': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.id ? {...t, title: action.payload.newTitle} : t)}
        }
        case 'ADD_TASKS_FOR_TODOLIST': {
            return {...state, [action.payload.newTodolistId]: [{id: v1(), title: 'empty task', isDone: false}]}
        }
        default: return state
    }
}

type ActionType = AddTasksAC | RemoveTaskAC | ChangeTaskStatusAC | ChangeTaskTitleAC | AddTasksForTodolistAC

type AddTasksAC = ReturnType<typeof addTaskAC>

export const addTaskAC = (title: string, todolistId: string) => {
    return{
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}

type RemoveTaskAC = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (id: string, todolistId: string) => {
    return{
        type: 'REMOVE_TASK',
        payload: {
            id,
            todolistId
        }
    } as const
}

type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return{
        type: 'CHANGE_TASK_STATUS',
        payload:{
            id,
            isDone,
            todolistId
        }
    } as const
}

type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return{
        type: 'CHANGE_TASK_TITLE',
        payload:{
            id,
            newTitle,
            todolistId
        }
    } as const
}

type AddTasksForTodolistAC = ReturnType<typeof addTasksForTodolistAC>

export const addTasksForTodolistAC = (newTodolistId: string) => {
    return{
        type: 'ADD_TASKS_FOR_TODOLIST',
        payload:{
            newTodolistId
        }
    } as const
}
