import React, {useReducer} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC,
    addTasksForTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./state/TasksReducer";


export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

// const AppWithReducers = () => {
//
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//
//     const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'},
//     ])
//
//
//     const [tasks, dispatchToTaskReducer] = useReducer(tasksReducer,{
//         [todolistId1]: [
//             {id: v1(), title: 'CSS&HTML', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'REACT', isDone: false},
//             {id: v1(), title: 'REDUX', isDone: false},
//             {id: v1(), title: 'QraphQL', isDone: false},
//         ],
//         [todolistId2]: [
//             {id: v1(), title: 'Bread', isDone: true},
//             {id: v1(), title: 'Milk', isDone: false},
//             {id: v1(), title: 'Butter', isDone: true},
//             {id: v1(), title: 'Meat', isDone: false},
//         ],
//     })
//
//     const removeTodolist = (todolistId: string) => {
//         dispatchToTodolistsReducer(RemoveTodolistAC(todolistId))
//         delete tasks[todolistId]
//     }
//
//     console.log(tasks)
//
//     const removeTask = (idTask: string, todolistId: string) => {
//         dispatchToTaskReducer(removeTaskAC(idTask, todolistId))
//     }
//
//     const changeFilter = (value: FilterValuesType, todolistId: string) => {
//         dispatchToTodolistsReducer(ChangeTodolistFilterAC(value, todolistId))
//     }
//
//     const changeStatusTask = (idTask: string, isDone: boolean, todolistId: string) => {
//         dispatchToTaskReducer(changeTaskStatusAC(idTask, isDone, todolistId))
//     }
//
//     const addTask = (inputValue: string, todolistId: string) => {
//         dispatchToTaskReducer(addTaskAC(inputValue, todolistId))
//     }
//
//     const addTodolist = (title: string) => {
//         let newTodolist: TodolistsType = {
//             id: v1(),
//             filter: 'all',
//             title: title,
//         }
//         dispatchToTodolistsReducer(AddTodolistAC(newTodolist))
//         dispatchToTaskReducer(addTasksForTodolistAC(newTodolist.id))
//     }
//
//     const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
//         dispatchToTaskReducer(changeTaskTitleAC(id, newTitle, todolistId))
//     }
//
//     const changeTodolistTitle = (todolistId: string, newTitle: string) => {
//         dispatchToTodolistsReducer(ChangeTodolistTitleAC(todolistId, newTitle))
//     }
//
//     return (
//         <div className='App'>
//             <AppBar position={'static'}>
//                 <Toolbar>
//                     <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant={'h6'}>
//                         News
//                     </Typography>
//                     <Button color={'inherit'}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>
//                     {
//                         todolists.map((tl) => {
//
//                             let tasksForTodolist = tasks[tl.id]
//                             if (tl.filter === 'completed') {
//                                 tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
//                             }
//                             if (tl.filter === 'active') {
//                                 tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
//                             }
//
//                             return (
//                                 <Grid item>
//                                     <Paper style={{padding: '10px'}}>
//                                         <Todolist
//                                             key={tl.id}
//                                             id={tl.id}
//                                             title={tl.title}
//                                             tasks={tasksForTodolist}
//                                             removeTask={removeTask}
//                                             changeFilter={changeFilter}
//                                             addTask={addTask}
//                                             changeStatusTask={changeStatusTask}
//                                             filter={tl.filter}
//                                             removeTodolist={removeTodolist}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodolistTitle={changeTodolistTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     )
// }
//
// export default AppWithReducers;
