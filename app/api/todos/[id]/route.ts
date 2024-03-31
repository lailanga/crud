import { todoController } from "@server/controller/todo";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    return new Response(`Eu sou o ID: ${id}`, {
      status: 200,
    });
}
  
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    return todoController.deleteById(request, params.id);
}
  

  /*
  export async function GET(request: Request) {
    console.log(request.headers);
    console.log("Toggle done");
    return new Response(JSON.stringify({message: "Toggle done!"}), {
        status: 200,
    });
}
  */
 