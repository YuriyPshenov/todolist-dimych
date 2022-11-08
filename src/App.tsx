import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

const App = () => {

    let[tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: 'CSS&HTML', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
        {id: 4, title: 'REDUX', isDone: false},
    ])

    let[filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (idTask: number) => {
        setTasks(tasks.filter((t) => t.id !== idTask))
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter( (t) => t.isDone )
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter( (t) => !t.isDone )
    }


    return (
        <div className='App'>
            <Todolist title={'What to learn'} tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
