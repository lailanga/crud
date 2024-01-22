import fs from "fs"; //ES6
import { v4 as uuid } from 'uuid';

// const fs = require("fs");
const DB_FILE_PATH = "./core/db"

console.log("[CRUD]");

type UUID = string;

interface Todo {
    id: UUID;
    date: string;
    content: string;
    done: boolean;
}

function create(content: string): Todo {
    const todo: Todo = {
        id: uuid(),
        date: new Date().toISOString(),
        content: content,
        done: false,
    };
    //console.log(todo);

    const todos: Array<Todo> = [
        ...read(),
        todo,
    ];

    // salvar o content no sistema
    //fs.writeFileSync(DB_FILE_PATH, content);
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
    }, null, 2));

    //return content;
    return todo;
}

function read(): Array<Todo> {
    const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const db = JSON.parse(dbString || "{}");
    if(!db.todos){
        return [];
    }
    return db.todos;
}

// update(DEQUEM, OQUE);
function update(id: UUID, partialTodo: Partial<Todo>): Todo {
    let updateTodo;
    const todos = read();
    todos.forEach((currentTodo) => {
        const isToUpdate = currentTodo.id === id;
        if(isToUpdate) {
            updateTodo = Object.assign(currentTodo, partialTodo);
        }
    });
    //console.log("TODOS atualizadas >> ", todos);
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos,
    }, null, 2));
    
    if(!updateTodo) {
        throw new Error("Please, provide another ID!")
    }
    return updateTodo;
}

function updateContentById(id: UUID, content: string): Todo {
    return update(id, {
        content,
    });
}

function deleteById(id: UUID) {
    const todos = read();
    const todosWithoutOne = todos.filter((todo) => {
        if(id === todo.id) {
            return false;
        }
        return true;
    });

    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
        todos: todosWithoutOne,
    }, null, 2));
}

function CLEAR_DB() {
    fs.writeFileSync(DB_FILE_PATH, "");
}


// [SIMULATION]
CLEAR_DB();
create("Primeira TODO");
const secondTodo = create("Segunda TODO");
deleteById(secondTodo.id);
const thirdTodo = create("Terceira TODO");
// update(thirdTodo.id, {
//     content: "Terceira Todo ok",
//     done: true
// });
updateContentById(thirdTodo.id, "Atualizada Terceira Todo");
const todos = read();
console.log(todos);
console.log(todos.length);

