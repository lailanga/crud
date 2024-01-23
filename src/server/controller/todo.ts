import { read } from "@db-crud-todo";

function get(req: Request) {
    console.log(req.method);
    const ALL_TODOS = read();
    return new Response(
        JSON.stringify({
            todos: ALL_TODOS,
        },null,2),
        {
          status: 200,
        }
    );
};

export const todoController = {
    get,
};