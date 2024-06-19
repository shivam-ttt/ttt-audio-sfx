import React from "react";
import styled from "styled-components";
import applyFadeEffect from "./audio";

function Player({ src, fadeInDuration, fadeOutDuration }) {
    const [playing, setPlaying] = React.useState(false);
    const audioRef = React.useRef(new Audio());

    React.useEffect(() => {
        setInterval(() => {
            console.log(audioRef.current);
        }, 1000);

        return () => {
            clearInterval();
        };
    }, []);

    React.useEffect(() => {
        if (src) {
            audioRef.current = new Audio();
            applyFadeEffect(
                audioRef.current,
                src,
                fadeInDuration,
                fadeOutDuration
            );
        }

        return () => {
            audioRef.current.pause();
        };
    }, [fadeInDuration, fadeOutDuration, src]);

    React.useEffect(() => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        return () => {
            audioRef.current.pause();
        };
    }, [playing]);

    return (
        <Center>
            <Button onClick={() => setPlaying(!playing)}>
                {playing ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="64"
                        height="64"
                    >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="64"
                        height="64"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </Button>
        </Center>
    );
}

export default Player;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5vh;
`;

const Button = styled.button`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    background-color: #61dafb;
    color: #282c34;
    font-size: 1.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
    margin: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    &:hover {
        background-color: #4fa3d1;
    }

    &:active {
        background-color: #3b8bbf;
    }
`;
