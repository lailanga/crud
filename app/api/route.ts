export async function GET(request: Request) {
    // eslint-disable-next-line no-console
    console.log(request.headers);
    return new Response(JSON.stringify({ message: `Ola Mundo!` }), {
        status: 200,
    });
}
//ror: Insert `␍`  prettier/prettier

/*
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // eslint-disable-next-line no-console
  console.log(request.headers);
  response.status(200).json({ message: "Olá mundo!" });
}
*/
