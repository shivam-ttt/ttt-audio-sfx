import React, { useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { getEquiDistantNumbers, getStepColors } from "../breather/utils";

function Orbitals({
    steps = 8,
    startColor = "#000000",
    endColor = "#ffffff",
    children,
}) {
    steps = Math.max(2, steps);
    const colors = getStepColors(startColor, endColor, steps);
    const [size, setSize] = useState([0, 0]);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        const handleResize = () => {
            setSize([
                sceneRef.current.offsetHeight,
                sceneRef.current.offsetWidth,
            ]);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const radii = getEquiDistantNumbers(size[0] / 2.8, size[1] * 1.8, steps);

    return (
        <Container>
            <GlobalStyle />
            <Scenery ref={sceneRef}>
                <svg
                    viewBox={`0 0 ${size[1] * 2} ${size[0]}`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {colors.map((color, index) => (
                        <circle
                            key={color}
                            cx="50%"
                            cy="50%"
                            r={radii[index]}
                            fill={color}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            className="echo-orbitals-animation"
                        />
                    ))}
                </svg>
            </Scenery>
            {children && <Overlay>{children}</Overlay>}
        </Container>
    );
}

export default Orbitals;

const Container = styled.section`
    position: relative;
`;

const Scenery = styled.div`
    overflow: hidden;
    position: absolute;
    inset: 0;
    z-index: 0;
    width: 200vw; /* Set to twice the viewport width */
    transform: translateX(-50vw); /* Translate to start halfway left */
`;

const Overlay = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
`;

// Global CSS for SVG animations
const GlobalStyle = createGlobalStyle`
    @keyframes echo-orbitals-animation {
        0%,
        20% {
            transform: scale(1);
        }
        80%,
        100% {
            transform: scale(1.2);
        }
    }

    .echo-orbitals-animation {
        animation: echo-orbitals-animation 2s infinite ease-in-out alternate;
    }
`;
