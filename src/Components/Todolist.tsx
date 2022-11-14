import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import s from "./Todolist.module.css";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (idTask: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (inputValue: string, todolistId: string) => void
    changeStatusTask: (idTask: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
} // описываем какой должен быть объект

export const Todolist = (props: TodolistPropsType) => { // props = {title: {'Wha to learn'}, tasks: [...]}, props - это объект

    // Local state
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)

    // Function
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }

    const onKeyDownEnterPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && onClickAddTask()

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const deleteTodolist = () => {
        props.removeTodolist(props.id)
    }

    //filter tasks functions
    const onClickAllFilter = () => props.changeFilter('all', props.id)
    const onClickActiveFilter = () => props.changeFilter('active', props.id)
    const onClickCompletedFilter = () => props.changeFilter('completed', props.id)

    //Styles
    const allFilterButton = props.filter === 'all' ? s.activeFilter : ''
    const activeFilterButton = props.filter === 'active' ? s.activeFilter : ''
    const completedFilterButton = props.filter === 'completed' ? s.activeFilter : ''
    const errorStyle = error ? s.error : ''

    return (
        <div>
            <div>
                <h3>{props.title}<button onClick={deleteTodolist}>x</button></h3>
            </div>
            <div>
                <input className={errorStyle} value={title} onChange={onChangeTitle} onKeyDown={onKeyDownEnterPress}/>
                <button onClick={onClickAddTask}>+</button>
                {error && <div className={s.errorMessage}>Недоступное имя таски</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                            //help function
                            const removeTask = () => props.removeTask(t.id, props.id)
                            const taskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeStatusTask(t.id, event.currentTarget.checked, props.id)
                            const isDoneStyle = t.isDone ? s.isDone : ''

                            return (
                                <li key={t.id} className={isDoneStyle}><input type={'checkbox'} checked={t.isDone}
                                                                              onChange={taskStatus}/><span>{t.title}</span>
                                    <button onClick={removeTask}>x</button>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button className={allFilterButton} onClick={onClickAllFilter}>All</button>
                <button className={activeFilterButton} onClick={onClickActiveFilter}>Active</button>
                <button className={completedFilterButton} onClick={onClickCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}