import { useEffect, useState } from "react"
import DisciplinaList from "../../../components/List/DisciplinasList";
import MsgError from "../../../components/MsgError/MsgError";

interface Disciplina {
    id: number;
    titulo: string;
    descricao?: string;
    professor?: string;
    curso?: string;
}

export default function Disciplinas() {

    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [filteredDisciplinas, setFilteredDisciplinas] = useState(disciplinas);
    const [msgError, setMsgError] = useState("");

    useEffect(() => {
        const fetchDisciplinas = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/disciplinas`);
            if (!response.ok) {
                console.error("Erro ao buscar disciplinas");
                const data = await response.json();
                setMsgError(data.message);
                return;
            }
            const data = await response.json();
            setDisciplinas(data.data);
            setFilteredDisciplinas(data.data);
        };
        fetchDisciplinas();
    }, []);

    return (
        <>
            {msgError && <MsgError msg={msgError} />}
            <div className="flex justify-center items-center p-5">
                <h1 className="text-4xl font-bold text-[#374151]">Disciplinas</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 p-2 gap-4">
                <DisciplinaList dados={disciplinas} />
            </div>
        </>
    )
}