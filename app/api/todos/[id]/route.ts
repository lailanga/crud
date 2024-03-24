export async function GET(request: Request) {
    console.log(request.headers);
    console.log("Toggle done");
    return new Response(JSON.stringify({message: "Toggle done!"}), {
        status: 200,
    });
}
