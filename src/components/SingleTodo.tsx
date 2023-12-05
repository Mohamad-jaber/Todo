import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/models";




interface props {
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}


const SingleTodo: React.FC<props> = ({
    todo,
    todos,
    setTodos
}) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        const newTodo: Todo[] = todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo));
        setTodos(newTodo);
        localStorage.setItem('todo', JSON.stringify(newTodo));
        setEdit(false);
    };

    const handleDelete = (id: number) => {
        const newTodo: Todo[] = todos.filter((todo) => todo.id !== id);
        setTodos(newTodo);
        localStorage.setItem('todo', JSON.stringify(newTodo));
    };

    const handleDone = (id: number) => {
        const newTodo: Todo[] = todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo);

        setTodos(newTodo);

        localStorage.setItem('todo', JSON.stringify(newTodo));
    };

    return (
        <form
            onSubmit={(e) => handleEdit(e, todo.id)}
            className={`todos__single`}
        >
            {edit ? (
                <input
                    value={editTodo}
                    onChange={(e) => setEditTodo(e.target.value)}
                    className="todos__single--text"
                    ref={inputRef}
                />
            ) : todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
            ) : (
                <span className="todos__single--text">{todo.todo}</span>
            )}
            <div>
                {
                    !todo.isDone &&
                    <span
                        className="icon"
                        onClick={() => {
                            if (!edit && !todo.isDone) {
                                setEdit(!edit);
                            }
                        }}
                    >
                        <AiFillEdit />
                    </span>
                }
                <span className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className="icon" onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
        </form>
    );
};

export default SingleTodo;