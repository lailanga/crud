import { todoRepository } from "@server/repository/todo";


function get(req: Request) {

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
        const output = todoRepository.get({page, limit});

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

export const todoController = {
    get,
};