import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./Todolist.module.css";

type AddItemFormPropsType = {
    addItem: (inputValue: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    //local state
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const errorStyle = error ? s.error : ''

    //function
    const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
    }

    const onKeyDownEnterPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && onClickAddTask()

    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <input className={errorStyle} value={title} onChange={onChangeTitle} onKeyDown={onKeyDownEnterPress}/>
            <button onClick={onClickAddTask}>+</button>
            {error && <div className={s.errorMessage}>Недоступное имя таски</div>}
        </div>
    )
}