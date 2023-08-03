"use client";

import React from "react";
import {
  LoginAndSignupForms,
  LoginForm,
  SignupForm,
  StyledGoogleButton,
  VerticalDivider,
} from "./LoginPage.styles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithGoogle } from "@/firebase/clientApp";

function LoginPage() {
  const queryClient = useQueryClient();
  const registerGoogle = async () => {
    return await signInWithGoogle();
  };

  const newGoogleUser = useMutation(registerGoogle, {
    onSuccess: () => {
      console.log("SUCCESS");
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <>
      <StyledGoogleButton
        onClick={() => {
          newGoogleUser.mutate();
        }}
      >
        Sign in with Google
      </StyledGoogleButton>
      <LoginAndSignupForms>
        <LoginForm>
          {/* email */}
          <input type="email" name="email" id="email" placeholder="email" />
          {/* password */}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          {/* submit */}
          <button className="actionButton" type="submit">
            Log In
          </button>
        </LoginForm>

        <VerticalDivider />
        <SignupForm>
          {/* username */}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          {/* email */}
          <input type="email" name="email" id="email" placeholder="email" />
          {/* password */}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          {/* submit */}
          <button type="submit" className="actionButton">
            Sign Up
          </button>
        </SignupForm>
      </LoginAndSignupForms>
    </>
  );
}

export default LoginPage;
