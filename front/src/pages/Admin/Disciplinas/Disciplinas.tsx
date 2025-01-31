import { useEffect, useState } from "react"
import DisciplinaList from "../../../components/List/DisciplinasList";
import MsgError from "../../../components/MsgError/MsgError";
import SearchBar from "../../../components/SearchBar/SearchBar";

interface Disciplina {
    id: number;
    titulo: string;
    descricao?: string;
    professor_id?: number;
    curso_id?: number;
}

export default function Disciplinas() {

    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [filteredDisciplinas, setFilteredDisciplinas] = useState(disciplinas);

    const [msgError, setMsgError] = useState("");

    const handleSearch = ({ term }: { term: string, type: string }) => {
        const filtered = disciplinas.filter((disciplina) => {
            const matchesName = disciplina.titulo.toLowerCase().includes(term.toLowerCase());
            return matchesName;
        });
        setFilteredDisciplinas(filtered);
    }

    useEffect(() => {
        const fetchDisciplinas = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/disciplinas`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
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
            <SearchBar email={false} onSearch={handleSearch} />
            <div className="flex justify-center items-center">
                <div className="grid flex grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-4 lg:w-200 items-center">
                    <DisciplinaList dados={filteredDisciplinas} />
                </div>
            </div>
        </>
    )
}