"use client";

import { useContext } from "react";
import {
  AuthForm,
  OR,
  StyledGoogleButton,
  VerticalDivider,
} from "./authPages.styles";
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
        Log in with Google
      </StyledGoogleButton>
      <OR>
        <div />
        <h2>OR</h2>
        <div />
      </OR>

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
        <input type="email" name="email" id="email-login" placeholder="email" />
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
    </div>
  );
}

export default LoginPage;
