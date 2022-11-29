import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TasksType>
}

const App = () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
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

    const addTodolist = (title: string) => {
        let todolist: TodolistsType = {
            id: v1(),
            filter: 'all',
            title: title,
        }
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: [{id: v1(), title: 'newTask', isDone: false}]})
    }

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId].map(el => el.id === id ? {...el, title: newTitle} : el)]
        })
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title: newTitle} : t))
    }

    return (
        <div className='App'>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((tl) => {

                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
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
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
