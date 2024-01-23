
interface TodoRepositoryGetParams {
    page: number;
    limit: number;
};
interface TodoRepositoryGetOutput {
    todos: Todo[];
    total: number;
    pages: number;
};

function get({ page, limit }: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    return fetch("/api/todos").then(async (respostaDoServidor) => {
        const todosString = await respostaDoServidor.text();

        //const todosFromServer = JSON.parse(todosString).todos;
        const todosFromServer = parseTodosFromServer(JSON.parse(todosString)).todos;

        const ALL_TODOS = todosFromServer;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
        const totalPages = Math.ceil(ALL_TODOS.length / limit);

        //console.log("page ", page);
        //console.log("limit ", limit);

        return {
            todos: paginatedTodos,
            total: ALL_TODOS.length,
            pages: totalPages,
        };
    });
};

export const todoRepository = {
    get,
};

interface Todo {
    id: string;
    content: string;
    date: Date;
    done: boolean;
};

function parseTodosFromServer(responseBody: unknown): { todos : Array<Todo> } {

    if(responseBody !== null && 
        typeof responseBody === "object" && 
        "todos" in responseBody && 
        Array.isArray(responseBody.todos) ) {

        return {
            todos: responseBody.todos.map((todo: unknown) => {
                if(todo === null && typeof todo !== "object") {
                    throw new Error("Invalid todo from API");
                }

                const { id, content, done, date } = todo as {
                    id: string;
                    content: string;
                    date: string;
                    done: string;
                };

                return {
                    id,
                    content,
                    date: new Date(date),
                    done: String(done).toLocaleLowerCase() === "true",
                };
            }),
        }
    }
    
    return {
        todos: [],
    };
}