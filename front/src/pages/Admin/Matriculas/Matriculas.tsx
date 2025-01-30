import { useEffect, useState } from "react";
import MatriculasList from "../../../components/List/MatriculasList";
import MsgError from "../../../components/MsgError/MsgError";

interface Matricula {
    id: number;
    nome_aluno: string;
    nome_disciplina: string;
    aluno: { id: number; nome: string };
    curso: { id: number; titulo: string };
}

export default function Matriculas() {

    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [filteredMatriculas, setFilteredMatriculas] = useState(matriculas);
    const [msgError, setMsgError] = useState("");

    useEffect(() => {
        const fetchMatriculas = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/matriculas`);
            if (!response.ok) {
                console.error("Erro ao buscar matrículas");
                const data = await response.json();
                console.log(data.message);
                setMsgError(data.message);
                return;
            }
            const data = await response.json();
            setMatriculas(data.data);
            setFilteredMatriculas(data.data);
        };
        fetchMatriculas();
    }, []);

    return (
        <>{msgError && <MsgError msg={msgError} />}
            <div className="flex justify-center items-center p-5">
                <h1 className="text-4xl font-bold text-[#374151]">Matrículas</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-2 gap-4">
                <MatriculasList dados={filteredMatriculas} />
            </div>
        </>
    )
}