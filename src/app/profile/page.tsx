import type { Metadata, NextPage } from "next";
import UserProfilePage from "@/pages/UserProfilePage/UserProfilePage";

export const metadata: Metadata = {
  title: "Mini Games: User Profile",
};


const UserProfile: NextPage = () => {
  return (
    <UserProfilePage />
  );
}

export default UserProfile;