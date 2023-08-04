"use client";

import React, { useContext } from "react";
import {
  AuthForm,
  LoginAndSignupForms,
  OR,
  StyledGoogleButton,
  VerticalDivider,
} from "./LoginPage.styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from "@/firebase/clientApp";
import { useRouter } from "next/navigation";
import UserContext from "@/lib/UserContext";

function LoginPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setLoggedInUser } = useContext(UserContext);

  const registerGoogle = async () => {
    return await signInWithGoogle(setLoggedInUser);
  };

  const newGoogleUser = useMutation(registerGoogle, {
    onSuccess: () => {
      console.log("SUCCESS");
      queryClient.invalidateQueries(["users"]);
      router.push("/");
    },
  });

  const registerEmail = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    return await signUpWithEmail(username, email, password, setLoggedInUser);
  };
  const newUser = useMutation(registerEmail, {
    onSuccess: () => {
      console.log("SUCCESS");
      queryClient.invalidateQueries(["users"]);
      router.push("/");
    },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <StyledGoogleButton
        onClick={() => {
          newGoogleUser.mutate();
        }}
      >
        Sign in with Google
      </StyledGoogleButton>
      <OR>
        <div />
        <h2>OR</h2>
        <div />
      </OR>
      <LoginAndSignupForms>
        <AuthForm
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            signInWithEmail(
              formData.get("email") as string,
              formData.get("password") as string,
              setLoggedInUser
            );

            router.push("/");
          }}
        >
          {/* email */}
          <input
            type="email"
            name="email"
            id="email-login"
            placeholder="email"
          />
          {/* password */}
          <input
            type="password"
            name="password"
            id="password-login"
            placeholder="password"
          />
          {/* submit */}
          <button className="actionButton" type="submit">
            Log In
          </button>
        </AuthForm>

        <VerticalDivider />
        <AuthForm
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const username = formData.get("username") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            newUser.mutate({ username, email, password });
          }}
        >
          {/* username */}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          {/* email */}
          <input
            type="email"
            name="email"
            id="email-signup"
            placeholder="email"
          />
          {/* password */}
          <input
            type="password"
            name="password"
            id="password-signup"
            placeholder="password"
          />
          {/* submit */}
          <button type="submit" className="actionButton">
            Sign Up
          </button>
        </AuthForm>
      </LoginAndSignupForms>
    </div>
  );
}

export default LoginPage;
