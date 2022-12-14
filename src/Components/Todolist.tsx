import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import s from "./Todolist.module.css";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
} // описываем какой должен быть объект

export const Todolist = (props: TodolistPropsType) => { // props = {title: {'Wha to learn'}, tasks: [...]}, props - это объект

    const dispatch = useDispatch()
    const tasks = useSelector<AppRootState, TasksType[]>(state => state.tasks[props.id])

    const addTask = (inputValue: string) => {
        dispatch(addTaskAC(inputValue, props.id))
    }

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter((t) => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter((t) => !t.isDone)
    }

    // Function
    const deleteTodolist = () => {
        props.removeTodolist(props.id)
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
                    tasksForTodolist.map((t) => {
                            //help function
                            const removeTaskHandler = () => dispatch(removeTaskAC(t.id, props.id))
                            const taskStatus = (event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(t.id, event.currentTarget.checked, props.id))
                            const onChangeTitleStatusHandler = (newValue: string) => dispatch(changeTaskTitleAC(t.id, newValue, props.id))
                            const isDoneStyle = t.isDone ? s.isDone : ''

                            return (
                                <div key={t.id} className={isDoneStyle}>
                                        <Checkbox checked={t.isDone} onChange={taskStatus}/>
                                        <EditableSpan title={t.title} onChange={onChangeTitleStatusHandler}/>
                                        <IconButton onClick={removeTaskHandler}>
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

