import { FaLock, FaUserPlus } from "react-icons/fa";
import {
  Link,
  useSearchParams,
  useNavigation,
  useActionData,
  Form,
} from "@remix-run/react";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const validationErrors = useActionData();

  const authMode = searchParams.get("mode") || "login";

  const submitBtnCaption = authMode === "login" ? "Login" : "Create User";

  const transitionCaption =
    authMode === "login" ? "Authenticating..." : "Creating User...";

  const toggleBtnCaption =
    authMode === "login" ? "Create A New User" : "Login With Existing User";

  const isSubmitting = navigation.state !== "idle";
  return (
    <Form method="post" className="form" id="auth-form">
      <div>
        <h1 className="flex justify-center text-white py-1">
          {" "}
          {authMode === "login"
            ? "Login"
            : "Create Account to Start Buying and Selling"}
        </h1>
        <div className="icon-img flex justify-center text-white">
          {authMode === "login" ? <FaLock /> : <FaUserPlus />}
        </div>
      </div>

      <p className="grid justify-center items-center text-center pt-5 pb-3">
        <label htmlFor="email" className="text-white">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="border-2 border-white rounded"
        />
      </p>
      <p className="grid justify-center items-center text-center py-5">
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          minLength={7}
          className="border-2 border-white rounded"
        />
      </p>
      {validationErrors && (
        <ul className="flex justify-center">
          {Object.values(validationErrors).map((error) => (
            <li className="text-white text-xl" key={error}>
              {error}
            </li>
          ))}
        </ul>
      )}

      <div className="form-actions grid justify-center items-center text-center text-white py-5 space-x-2 space-y-10">
        <button
          disabled={isSubmitting}
          className="px-1 text-white border-2 rounded"
        >
          {isSubmitting ? transitionCaption : submitBtnCaption}
        </button>
        <button className="px-1 text-white border-2 rounded">
          <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
            {toggleBtnCaption}
          </Link>
        </button>
      </div>
    </Form>
  );
}

export default AuthForm;
