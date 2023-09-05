import React from "react";
import { DotsContainer, LoadingDot } from "./ThreeDotsWave.styles";

export default function ThreeDotsWave() {

    return (
        <DotsContainer>
            <LoadingDot delay="0s" />
            <LoadingDot delay="0.2s" />
            <LoadingDot delay="0.4s" />
        </DotsContainer>
    );
}
