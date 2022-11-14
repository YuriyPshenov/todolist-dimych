import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Components/Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'completed' | 'active'

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])


    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'CSS&HTML', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'REDUX', isDone: false},
            {id: v1(), title: 'QraphQL', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Butter', isDone: true},
            {id: v1(), title: 'Meat', isDone: false},
        ],
    })

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    console.log(tasks)

    const removeTask = (idTask: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== idTask)})
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        setTodolists([...todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl)])
    }

    const changeStatusTask = (idTask: string, isDone: boolean, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === idTask ? {...el, isDone: isDone} : el)})
    }

    const addTask = (inputValue: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: [{id: v1(), title: inputValue, isDone: false}, ...tasks[todolistId]]})
    }


    return (
        <div className='App'>
            {
                todolists.map( (tl) => {

                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter( (t) => t.isDone )
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter( (t) => !t.isDone )
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatusTask={changeStatusTask}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                } )
            }
        </div>
    );
}

export default App;
