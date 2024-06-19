import { useState } from "react";
import styled from "styled-components";
import Player from "./player";

function App() {
    const [audioURL, setAudioURL] = useState("");

    return (
        <Main>
            <div>
                <Input
                    type="text"
                    value={audioURL}
                    onChange={(e) => setAudioURL(e.target.value)}
                    placeholder="Enter audio URL..."
                />

                {audioURL && (
                    <Player
                        src={audioURL}
                        fadeInDuration={10}
                        fadeOutDuration={10}
                    />
                )}
            </div>
        </Main>
    );
}

export default App;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #282c34;
    font-size: calc(10px + 2vmin);
    width: 100%;
    color: white;

    & > div {
        width: 100%;
        max-width: 600px;
        padding: 2rem;
        border-radius: 0.5rem;
        background-color: #282c34;
    }
`;

const Input = styled.input`
    width: 100%;
    font-size: 1.5rem;
    padding: 1rem;
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background-color: #fff;
    color: #282c34;
    box-shadow: 0 0 0 0.2rem #282c34;
    transition: box-shadow 0.3s;
    &:focus {
        box-shadow: 0 0 0 0.2rem #61dafb;
    }
`;
