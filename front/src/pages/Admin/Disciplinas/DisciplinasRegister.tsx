import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import MsgError from "../../../components/MsgError/MsgError";

interface Curso {
    titulo: string;
    id: number;
    descricao?: string;
    data_inicio?: string;
    data_fim?: string;
}

interface Professor {
    nome: string;
    email?: string;
    id: number;
}

export default function DisciplinasRegister() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");

    const [cursos, setCursos] = useState<Curso[]>([]);
    const [selectedCurso, setSelectedCurso] = useState<Curso>();
    const [filteredCursos, setFilteredCursos] = useState<Curso[]>([]);
    const [professores, setProfessores] = useState<Professor[]>([]);
    const [selectedProfessor, setSelectedProfessor] = useState<Professor>();
    const [filteredProfessores, setFilteredProfessores] = useState<Professor[]>([]);
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchCursos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos`);
            if (!response.ok) {
                console.error("Erro ao buscar cursos");
                const errorData = await response.json();
                console.log(errorData.message);
                return;
            }
            const data = await response.json();
            setCursos(data.data);
            setFilteredCursos(data.data);
        };
        const fetchProfessores = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/professores`);
            if (!response.ok) {
                console.error("Erro ao buscar professores");
                const errorData = await response.json();
                console.log(errorData.message);
                return;
            }
            const data = await response.json();
            setProfessores(data.data);
            setFilteredProfessores(data.data);
        };
        fetchCursos();
        fetchProfessores();
    }, []);

    const handleSearchCurso = ({ term }: { term: string }) => {
        const filtered = cursos.filter((curso) => {
            const matchesName = curso.titulo.toLowerCase().includes(term.toLowerCase());
            return matchesName;
        });
        setFilteredCursos(filtered);
    };

    const handleProfessorSearch = ({ term }: { term: string }) => {
        const filtered = professores.filter((professor) => {
            const matchesName = professor.nome.toLowerCase().includes(term.toLowerCase());
            return matchesName;
        });
        setFilteredProfessores(filtered);
    };
    const handleRegister = async () => {
        if (!titulo || !selectedCurso || !selectedProfessor) {
            setMsg("Preencha os campos");
            return;
        }
        const formData = {
            titulo: titulo,
            descricao: descricao,
            curso_id: selectedCurso?.id,
            professor_id: selectedProfessor?.id
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/disciplinas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                setMsg(data.message);
                return;
            }
            setSuccess(true);
        } catch (error) {

        }
        console.log(formData);
        console.log("Cadastrando disciplina:", titulo, descricao, selectedCurso, selectedProfessor);
    };

    useEffect(() => {
        if (msg) {
            const timer = setTimeout(() => {
                setMsg("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [msg]);

    if (success) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-gray-800">Disciplina cadastradas com sucesso!</h1>
                    <button className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setSuccess(false)}>
                        Cadastrar outra disciplina
                    </button>
                </div>
            </div>
        )
    }


    return (
        <>
            {msg && <MsgError msg={msg} />}
            <div className="flex flex-col items-center gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800">Cadastrar Disciplina</h1>

                <div className="flex flex-col gap-6 w-full max-w-md">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo" className="text-lg font-medium text-gray-700">Título:</label>
                        <input
                            required
                            name="titulo"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="descricao" className="text-lg font-medium text-gray-700">Descrição:</label>
                        <input
                            name="descricao"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <SearchBar onSearch={handleSearchCurso} />
                        <label htmlFor="curso" className="text-lg font-medium text-gray-700">Curso:</label>
                        <select
                            required
                            className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedCurso?.id || ""}
                            onChange={(e) => {
                                const curso = cursos.find(curso => curso.id === Number(e.target.value));
                                setSelectedCurso(curso);
                            }}
                        >
                            <option value="">Selecione um curso</option>
                            {filteredCursos.map((curso) => (
                                <option key={curso.id} value={curso.id}>{curso.titulo}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <SearchBar onSearch={handleProfessorSearch} />
                        <label htmlFor="professor" className="text-lg font-medium text-gray-700">Professor:</label>
                        <select
                            required
                            className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={selectedProfessor?.id || ""}
                            onChange={(e) => {
                                const professor = professores.find(prof => prof.id === Number(e.target.value));
                                setSelectedProfessor(professor);
                            }}
                        >
                            <option value="">Selecione um professor</option>
                            {filteredProfessores.map((professor) => (
                                <option key={professor.id} value={professor.id}>{professor.nome}</option>
                            ))}
                        </select>
                    </div>
                    <button className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleRegister}>
                        Cadastrar
                    </button>

                </div>
            </div>
        </>
    )
}