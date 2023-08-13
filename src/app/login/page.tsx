import LoginPage from "@/pages/authPages/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mini Games: Login",
};

function Login() {
  return <LoginPage />;
}

export default Login;
