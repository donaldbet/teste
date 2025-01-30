import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import BtnFilter from "../../../components/BtnFilter/BtnFilter";
import ProfessoresList from "../../../components/List/ProfessoresList";
import MsgError from "../../../components/MsgError/MsgError";

interface Professor {
    nome: string;
    email: string;
    id: number;
}

export default function Professores() {

    const [professores, setProfessores] = useState<Professor[]>([]);
    const [filteredProfessores, setFilteredProfessores] = useState(professores);
    const [msgError, setMsgError] = useState("");

    useEffect(() => {
        const fetchProfessores = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/professores`);
            if (!response.ok) {
                console.error("Erro ao buscar professores");
                const data = await response.json();
                console.log(data.message);
                setMsgError(data.message);
                return;
            }
            const data = await response.json();
            setProfessores(data.data);
            setFilteredProfessores(data.data);
        };
        fetchProfessores();
    }, []);

    const handleSearch = ({ term }: { term: string, type: string }) => {
        const filtered = professores.filter((professor) => {
            const matchesName = professor.nome.toLowerCase().includes(term.toLowerCase());
            return matchesName;
        });
        setFilteredProfessores(filtered);
    }

    const handleFilter = (filterType: string) => {
        if (filterType === "name-asc") {
            const sorted = [...filteredProfessores].sort((a, b) => a.nome.localeCompare(b.nome));
            setFilteredProfessores(sorted);
        } else if (filterType === "name-desc") {
            const sorted = [...filteredProfessores].sort((a, b) => b.nome.localeCompare(a.nome));
            setFilteredProfessores(sorted);
        } else {
            setFilteredProfessores(professores);
        }
    }

    return (
        <>
            {msgError && <MsgError msg={msgError} />}
            <div className="flex justify-center items-center p-5">
                <h1 className="text-4xl font-bold text-[#374151]">Professores</h1>
            </div>
            <SearchBar email={false} onSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 p-2 gap-4">
                <ProfessoresList dados={filteredProfessores} />
            </div>
            <BtnFilter onFilter={handleFilter} email={false} />
        </>
    )
}