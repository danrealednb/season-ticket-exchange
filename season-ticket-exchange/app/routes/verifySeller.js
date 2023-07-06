// // no .jsx needed as there is no components
// import { json } from "@remix-run/node";
// import { verifySeller } from "../data/auth.server";

// export async function action({ request }) {
//   if (request.method !== "POST") {
//     throw json({ message: "Invalid request method" }, { status: 400 });
//   }
//   const verified = await verifySeller(request);
//   return verified;
// }
