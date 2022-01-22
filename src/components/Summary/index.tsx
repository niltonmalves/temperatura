import { Container } from "./styles";
export function Summary() {
    return (
        <Container>
           <div>
           <header>
                <p>temperatura</p>
            </header>
           </div>
            <div>           
            <header>
                <p>Medição realizada em:</p>
            </header>
            </div>
            <div><header>
                <p>Estado Geral</p>
            </header></div>
        </Container>

    )
}