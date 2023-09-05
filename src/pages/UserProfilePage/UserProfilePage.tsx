"use client";

import React, { useContext, useEffect } from "react";
import { Column, Label, PageContent, PageTitle, PageWrapper, Underline, UserInfo, Value } from "./UserProfilePage.styles";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/queries";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import UserContext from "@/lib/UserContext";

function UserProfilePage() {
    // get logged in userId from auth


    const { loggedInUser } = useContext(UserContext);

    console.log('logged in user', loggedInUser)
    //useeffect
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         console.log("onAuthStateChanged", user);
    //     });
    // }, []);

    // const userInfo = useQuery({
    //     queryKey: ["userInfo", userId],
    //     queryFn: () => fetchData(`/api/scores/${userId}`),
    // });

    const getJoinDate = () => {
        const date = loggedInUser?.metadata.creationTime;
        if (!date) return "Unknown"
        const dateObj = new Date(date);
        const dateString = dateObj.toLocaleDateString(undefined, { month: "long", year: "numeric", day: "numeric" });
        return dateString;
    };


    return (
        <PageWrapper>
            <PageTitle>User profile for {loggedInUser?.displayName}</PageTitle>
            <PageContent>
                <UserInfo>
                    <Column>
                        <h2>Account info</h2>
                        <Underline />
                        <div>
                            <Label>display name:</Label>
                            <div style={{
                                color: "var(--yellow)",
                                fontSize: '14px',
                            }}>(Display name is used on leaderboards)</div>
                            <Value>{loggedInUser?.displayName}</Value>
                        </div>
                        <div>
                            <Label>email:</Label>
                            <Value>{loggedInUser?.email}</Value>
                        </div>
                        <div>
                            <Label>member since:</Label>
                            <Value>{getJoinDate()}</Value>
                        </div>
                    </Column>

                    <Column>
                        <h2>Game stats</h2>
                        <Underline />
                        <div>
                            <Label>games played:</Label>
                            <Value>*games played*</Value>
                        </div>
                        <div>
                            <Label>games won:</Label>
                            <Value>*games won*</Value>
                        </div>
                        <div>
                            <Label>games lost:</Label>
                            <Value>*games lost*</Value>
                        </div>
                        <div>
                            <Label>games tied:</Label>
                            <Value>*games tied*</Value>
                        </div>
                    </Column>
                </UserInfo>

                <div>accordion: under construction</div></PageContent>
        </PageWrapper>
    );
}

export default UserProfilePage;
