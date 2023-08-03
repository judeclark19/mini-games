import LoginPage from "@/pages/Login/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Games: Login",
};

function Login() {
  return <LoginPage />;
}

export default Login;
