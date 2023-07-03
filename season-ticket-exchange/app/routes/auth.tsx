import AuthForm from "~/components/auth/AuthForm";
import AuthHeader from "~/components/AuthHeader";
// import { validateCredentials } from "~/data/validation.server";
// import { signup, login } from "~/data/auth.server";

export default function AuthPage() {
  return (
    <>
      <>
        <AuthHeader />
        <AuthForm />
      </>
    </>
  );
}

export async function action({ request }) {
  //   const searchParams = new URL(request.url).searchParams;
  //   const authMode = searchParams.get("mode") || "login";
  //   const formData = await request.formData();
  //   const credentials = Object.fromEntries(formData);
  //   // validate user input
  //   try {
  //     validateCredentials(credentials);
  //   } catch (error) {
  //     return error;
  //   }
  //   try {
  //     if (authMode === "login") {
  //       return await login(credentials);
  //     } else {
  //       return await signup(credentials);
  //     }
  //   } catch (error) {
  //     if (error.status === 422 || error.status === 401) {
  //       return { credentials: error.message };
  //     }
  //   }
  return null;
}
