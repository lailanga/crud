import { z as schema } from "zod";
import { todoRepository } from "@server/repository/todo";


async function get(req: Request) {

    console.log(req.method);

    const { searchParams } = new URL(req.url);
    const query = {
        page: searchParams.get("page"),
        limit: searchParams.get("limit"),
    };

    const page = Number(query.page);
    const limit = Number(query.limit);

    if (query.page && isNaN(page)) {
        return new Response(
          JSON.stringify({
            error: {
              message: "`page` must be a number",
            },
          },null,2),
          {
            status: 400,
          }
        );
      }
    if (query.limit && isNaN(limit)) {
    return new Response(
        JSON.stringify({
        error: {
            message: "`limit` must be a number",
        },
        },null,2),
        {
        status: 400,
        }
    );
    }

    try {
        const output = await todoRepository.get({page, limit});

        return new Response(
            JSON.stringify({
                total: output.total,
                pages: output.pages,
                todos: output.todos,
            },null,2),
            {
                status: 200,
            }
        );
    } catch {
        return new Response(
            JSON.stringify({
            error: {
                message: "Failed to fetch TODOs",
            },
            },null,2),
            {
            status: 400,
            }
        );
    }
    
};

const TodoCreateBodySchema = schema.object({
    content: schema.string(),
});

async function create(req: Request) {
    console.log(req.method);

    // Fail Fast Validations
    //const body = TodoCreateBodySchema.safeParse(req.body);
    const body = TodoCreateBodySchema.safeParse(await req.json());
    
    if(!body.success) {
        return new Response(
            JSON.stringify({
              error: {
                message: "You need to provide a content to create a TODO",
                description: body.error.issues,
              },
            }),
            {
              status: 400,
            }
        );
    }
    // Here we have the data!
    try {
        const createdTodo = await todoRepository.createByContent(body.data.content);
    
        return new Response(
            JSON.stringify({
              todo: createdTodo,
            }),
            {
              status: 201,
            }
          );
    } catch {
        return new Response(
            JSON.stringify({
              error: {
                message: "Failed to create todo",
              },
            }),
            {
              status: 400,
            }
          );
    }
};

export const todoController = {
    get,
    create,
};