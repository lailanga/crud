import { todoRepository } from "@ui/repository/todo";
import { Todo } from "@ui/schema/todo";

interface TodoControllerGetParams {
    page: number;
}

async function get(params: TodoControllerGetParams) {
    return todoRepository.get({
        page: params.page,
        limit: 10,
    });
};

function filterTodosByContent<Todo>(search: string, todos: Array<Todo & {content: string}>): Array<Todo> {
    const homeTodos = todos.filter((todo) => {
        const searchNormalized = search.toLocaleLowerCase();
        const contentNormalized = todo.content.toLocaleLowerCase();
        return contentNormalized.includes(searchNormalized);
    });
    return homeTodos;
};

interface TodoControllerCreateParams {
    content?: string;
    onError: () => void;
    onSuccess: (todo: Todo) => void;
}
function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
    //console.log("TodoControllerCreateParams ", content);
    // Fail Fast
    if(!content) {
        onError();
        return;
    }

    //const todo = {
    //    id: "125",
    //    content,
    //    date: new Date().toISOString(),
    //    done: false,
    //};

    todoRepository.createByContent(content).then((newTodo) => {
        onSuccess(newTodo);
    }).catch(() => {
        onError();
    });
    
};


export const todoController = {
    get,
    create,
    filterTodosByContent,
};