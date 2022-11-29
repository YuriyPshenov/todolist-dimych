import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import s from "./Todolist.module.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    const allFilterButton = props.filter === 'all' ? 'contained' : 'text'
    const activeFilterButton = props.filter === 'active' ? 'contained' : 'text'
    const completedFilterButton = props.filter === 'completed' ? 'contained' : 'text'
    const onChangeTitleTodolist = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.title} onChange={onChangeTitleTodolist}/>
                    <IconButton onClick={deleteTodolist}>
                        <Delete />
                    </IconButton>
                </h3>
            </div>
            <AddItemForm addItem={addTask}/>
                {
                    props.tasks.map((t) => {
                            //help function
                            const removeTask = () => props.removeTask(t.id, props.id)
                            const taskStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeStatusTask(t.id, event.currentTarget.checked, props.id)
                            const onChangeTitleStatusHandler = (newValue: string) => props.changeTaskTitle(t.id, newValue, props.id)
                            const isDoneStyle = t.isDone ? s.isDone : ''


                            return (
                                <div key={t.id} className={isDoneStyle}>
                                        <Checkbox checked={t.isDone} onChange={taskStatus}/>
                                        <EditableSpan title={t.title} onChange={onChangeTitleStatusHandler}/>
                                        <IconButton onClick={removeTask}>
                                            <Delete />
                                        </IconButton>
                                </div>
                            )
                        }
                    )
                }
            <div>
                <Button variant={allFilterButton} onClick={onClickAllFilter}>All</Button>
                <Button color={'success'} variant={activeFilterButton} className={activeFilterButton} onClick={onClickActiveFilter}>Active</Button>
                <Button color={'secondary'} variant={completedFilterButton} onClick={onClickCompletedFilter}>Completed</Button>
            </div>
        </div>
    )
}

