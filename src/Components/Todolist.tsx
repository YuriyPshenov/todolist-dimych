import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";
import s from "./Todolist.module.css";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (idTask: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (inputValue: string) => void
    changeStatusTask: (idTask: string, isDone: boolean) => void
    filter: FilterValuesType
} // описываем какой должен быть объект

export const Todolist = (props: TodolistPropsType) => { // props = {title: {'Wha to learn'}, tasks: [...]}, props - это объект

    // Local state
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // Function
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }

    const onClickAddTask = () => {
        if (title.trim() === '') {
            setTitle('')
            setError('Field is required')
            return;
        } else {
            props.addTask(title.trim())
            setTitle('')
            setError(null)
        }
    }

    //filter tasks functions
    const onClickAllFilter = () => props.changeFilter('all')
    const onClickActiveFilter = () => props.changeFilter('active')
    const onClickCompletedFilter = () => props.changeFilter('completed')

    //Styles
    const allFilterButton = props.filter === 'all' ? s.activeFilter : ''
    const activeFilterButton = props.filter === 'active' ? s.activeFilter : ''
    const completedFilterButton = props.filter === 'completed' ? s.activeFilter : ''
    const errorStyle = error ? s.error : ''

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={errorStyle} value={title} onChange={onChangeTitle} onKeyDown={onKeyDownEnterPress}/>
                <button onClick={onClickAddTask}>+</button>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                            //help function
                            const removeTask = () => props.removeTask(t.id)
                            const taskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeStatusTask(t.id, event.currentTarget.checked)
                            const isDoneStyle = t.isDone ? s.isDone : ''

                            return (
                                <li key={t.id} className={isDoneStyle}><input type={'checkbox'} checked={t.isDone} onChange={taskStatus}/><span>{t.title}</span>
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