import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";

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
} // описываем какой должен быть объект

export const Todolist = (props: TodolistPropsType) => { // props = {title: {'Wha to learn'}, tasks: [...]}, props - это объект

    // Local state
    const [title, setTitle] = useState('Имя таски')

    // Function
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(title)
        }
    }

    const onClickAddTask = () => {
        if (title === '') {
            return alert('недоступное имя таски')
        } else {
            props.addTask(title)
            setTitle('')
        }
    }
    //filter tasks functions
    const onClickAllFilter = () => {
        props.changeFilter('all')
    }
    const onClickActiveFilter = () => {
        props.changeFilter('active')
    }
    const onClickCompletedFilter = () => {
        props.changeFilter('completed')
    }

    //Styles

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeTitle} onKeyDown={onKeyDownEnterPress}/>
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {
                            const removeTask = () => props.removeTask(t.id)
                            return (
                                <li key={t.id}><input type={'checkbox'} checked={t.isDone}/><span>{t.title}</span>
                                    <button onClick={removeTask}>x</button>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={onClickAllFilter}>All</button>
                <button onClick={onClickActiveFilter}>Active</button>
                <button onClick={onClickCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}