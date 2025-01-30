import { useEffect, useState } from "react";
import BtnFilter from "../../../components/BtnFilter/BtnFilter";
import SearchBar from "../../../components/SearchBar/SearchBar";
import AlunosList from "../../../components/List/AlunosList";
import MsgError from "../../../components/MsgError/MsgError";

interface Aluno {
    nome: string;
    email: string;
    data_nascimento?: string;
    id: number;
}

export default function Alunos() {

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [filteredAlunos, setFilteredAlunos] = useState(alunos);
    const [msgError, setMsgError] = useState("");

    useEffect(() => {
        const fetchAlunos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/alunos`);
            if (!response.ok) {
                console.error("Erro ao buscar alunos");
                const data = await response.json();
                console.log(data.message);
                setMsgError(data.message);
                return;
            }
            const data = await response.json();
            setAlunos(data.data);
            setFilteredAlunos(data.data);
        };
        fetchAlunos();
    }, []);

    const handleSearch = ({ term, type }: { term: string, type: string }) => {
        if (type === "name") {
            const filtered = alunos.filter((aluno) => {
                const matchesName = aluno.nome.toLowerCase().includes(term.toLowerCase());
                return matchesName;
            });
            setFilteredAlunos(filtered);
        } else {
            const filtered = alunos.filter((aluno) => {
                const matchesEmail = aluno.email.toLowerCase().includes(term.toLowerCase());
                return matchesEmail;
            });
            setFilteredAlunos(filtered);
        }
    }

    const handleFilter = (filterType: string) => {
        if (filterType === "name-asc") {
            const sorted = [...filteredAlunos].sort((a, b) => a.nome.localeCompare(b.nome));
            setFilteredAlunos(sorted);
        } else if (filterType === "name-desc") {
            const sorted = [...filteredAlunos].sort((a, b) => b.nome.localeCompare(a.nome));
            setFilteredAlunos(sorted);
        } else if (filterType === "email-asc") {
            const sorted = [...filteredAlunos].sort((a, b) => a.email.localeCompare(b.email));
            setFilteredAlunos(sorted);
        } else if (filterType === "email-desc") {
            const sorted = [...filteredAlunos].sort((a, b) => b.email.localeCompare(a.email));
            setFilteredAlunos(sorted);
        } else {
            setFilteredAlunos(alunos);
        }
    }

    return (
        <>
            {msgError && <MsgError msg={msgError} />}
            <div className="flex justify-center items-center p-5">
                <h1 className="text-4xl font-bold text-[#374151]">Alunos</h1>
            </div>
            <SearchBar onSearch={handleSearch} email={true} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 p-2 gap-4">
                <AlunosList dados={filteredAlunos} />
            </div>
            <BtnFilter email={true} onFilter={handleFilter} />
        </>
    );
}