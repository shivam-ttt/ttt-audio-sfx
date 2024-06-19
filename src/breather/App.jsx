import styled from "styled-components";
import Breather from "./breather";

function App() {
    return (
        <Main>
            {new Array(31).fill(null).map((_, index) => (
                <Breather
                    key={index}
                    steps={index + 2}
                    startColor="#FAD1DB"
                    endColor="#EA265A"
                >
                    <Title>{index + 2}</Title>
                </Breather>
            ))}
        </Main>
    );
}

export default App;

const Main = styled.main`
    min-height: 100vh;
    background-color: white;
    width: 100%;

    & > * {
        height: calc(70vh - 5rem);
        width: 100%;
    }
`;

const Title = styled.p`
    display: flex;
    align-items: center;
    font-size: 8rem;
    min-height: 100%;
    padding-left: 1rem;
    color: gray;
    margin: 0;
    opacity: 0.3;
`;
