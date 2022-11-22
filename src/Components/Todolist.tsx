import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import s from "./Todolist.module.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
} // описываем какой должен быть объект

export const Todolist = (props: TodolistPropsType) => { // props = {title: {'Wha to learn'}, tasks: [...]}, props - это объект

    // Function
    const deleteTodolist = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    //filter tasks functions
    const onClickAllFilter = () => props.changeFilter('all', props.id)
    const onClickActiveFilter = () => props.changeFilter('active', props.id)
    const onClickCompletedFilter = () => props.changeFilter('completed', props.id)

    //Styles
    const allFilterButton = props.filter === 'all' ? s.activeFilter : ''
    const activeFilterButton = props.filter === 'active' ? s.activeFilter : ''
    const completedFilterButton = props.filter === 'completed' ? s.activeFilter : ''
    const onChangeTitleTodolist = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={onChangeTitleTodolist}/>
                    <button onClick={deleteTodolist}>x</button>
                </h3>
            </div>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((t) => {
                            //help function
                            const removeTask = () => props.removeTask(t.id, props.id)
                            const taskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeStatusTask(t.id, event.currentTarget.checked, props.id)
                            const onChangeTitleStatusHandler = (newValue: string) => props.changeTaskTitle(t.id, newValue, props.id)
                            const isDoneStyle = t.isDone ? s.isDone : ''

                        
                            return (
                                <li key={t.id} className={isDoneStyle}>
                                        <input type={'checkbox'} checked={t.isDone} onChange={taskStatus}/>
                                        <EditableSpan title={t.title} onChange={onChangeTitleStatusHandler}/>
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

