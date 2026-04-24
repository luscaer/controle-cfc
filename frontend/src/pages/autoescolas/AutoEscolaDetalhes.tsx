import { useParams } from "react-router-dom";

export function AutoEscolaDetalhes () {
    const { id } = useParams();

    return(
        <h1>Auto Escola de ID {id}</h1>
    );
}