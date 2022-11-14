import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'

const App = () => {

    let[tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: 'CSS&HTML', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'REDUX', isDone: false},
    ])

    let[filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (idTask: string) => {
        setTasks(tasks.filter((t) => t.id !== idTask))
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const changeStatusTask = (idTask: string, isDone: boolean) => {
        setTasks([...tasks.map(el => el.id === idTask ? {...el, isDone: isDone} : el)])
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter( (t) => t.isDone )
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter( (t) => !t.isDone )
    }

    const addTask = (inputValue: string) => {
        setTasks([{id: v1(), title: inputValue, isDone: false}, ...tasks])
    }

    return (
        <div className='App'>
            <Todolist title={'What to learn'} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask} changeStatusTask={changeStatusTask} filter={filter}/>
        </div>
    );
}

export default App;
