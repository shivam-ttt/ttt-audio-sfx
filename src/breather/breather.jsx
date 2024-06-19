import React from "react";
import { getEquiDistantNumbers, getStepColors } from "./utils";
import styled from "styled-components";

function Breather({
    steps = 8,
    startColor = "#000000",
    endColor = "#ffffff",
    children,
}) {
    steps = Math.max(2, steps);
    const colors = getStepColors(startColor, endColor, steps);
    const [size, setSize] = React.useState([0, 0]);

    const defaultColor = colors.pop();

    const sceneRef = React.useRef(null);

    React.useEffect(() => {
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

    const [, ...widths] = getEquiDistantNumbers(
        size[0] / 2.8,
        size[1] * 1.8,
        steps
    );

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.visibility = "visible";
                } else {
                    entry.target.style.visibility = "hidden";
                }
            });
        });

        observer.observe(sceneRef.current);

        return () => {
            observer.disconnect();
        };
    }, [size]);

    return (
        <Container>
            <Scenery ref={sceneRef} $color={defaultColor}>
                {colors.map((color, index) => (
                    <Dots
                        key={color}
                        style={{
                            backgroundColor: color,
                            width: widths[index],
                            zIndex: steps - index,
                            animationDelay: `${index * 0.1}s`,
                        }}
                    />
                ))}
            </Scenery>
            {children && <Overlay>{children}</Overlay>}
        </Container>
    );
}

export default Breather;

const Container = styled.section`
    z-index: 0;
    position: relative;
`;

const Scenery = styled.div`
    overflow: hidden;
    position: absolute;
    inset: 0;
    z-index: 0;
    background-color: ${(props) => props.$color};
`;

const Dots = styled.span`
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 0;
    translate: -50% -50%;
    aspect-ratio: 1 / 1;

    animation: breathe 2s infinite ease-in-out alternate;

    @keyframes breathe {
        0%,
        20% {
            transform: scale(1);
        }

        80%,
        100% {
            transform: scale(1.2);
        }
    }
`;

const Overlay = styled.div`
    position: absolute;
    inset: 0;
    z-index: 1;
`;
