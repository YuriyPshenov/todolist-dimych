import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.css";
import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (inputValue: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    //local state
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string>('')
    const errorStyle = error ? s.error : ''

    //function
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError('')
    }

    const onKeyDownEnterPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && onClickAddTask()

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('Недоступное имя таски')
        }
        setTitle('')
    }

    return (
        <div>
            <TextField variant={'outlined'} label={'Type value'} className={errorStyle} value={title} onChange={onChangeTitle} onKeyDown={onKeyDownEnterPress} error={!!error} helperText={error}/>
            <IconButton onClick={onClickAddTask} color={'primary'}>
                <AddCircle/>
            </IconButton>
            {/*{error && <div className={s.errorMessage}>Недоступное имя таски</div>}*/}
        </div>
    )
}