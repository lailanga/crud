import { z as schema } from "zod";
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

    const parsedParams = schema.string().nonempty().safeParse(content);

    if(!parsedParams.success) {
        onError();
        return;
    }

    todoRepository.createByContent(parsedParams.data).then((newTodo) => {
        onSuccess(newTodo);
    }).catch(() => {
        onError();
    });
    
};

interface TodoControllerToggleDoneParams {
    id: string;
    updateTodoOnScreen: () => void;
    onError: () => void;
}

function toggleDone({
    id,
    updateTodoOnScreen,
    onError,
}: TodoControllerToggleDoneParams) {
    // Optmistic Update
    // updateTodoOnScreen();
  
    todoRepository
      .toggleDone(id)
      .then(() => {
        // Update Real
        updateTodoOnScreen();
      })
      .catch(() => {
        onError();
    });
}

export const todoController = {
    get,
    create,
    filterTodosByContent,
    toggleDone,
};