import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import CardProfile from "../../../components/Card/CardProfile";
import CardCursos from "../../../components/Card/CardCursos";
import MsgError from "../../../components/MsgError/MsgError";

interface Aluno {
    nome: string;
    email?: string;
    data_nascimento?: string;
    id: number;
}

interface Curso {
    titulo: string;
    descricao: string;
    id: number;
}

export default function MatriculasRegister() {

    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [step, setStep] = useState(1);
    const [filteredAlunos, setFilteredAlunos] = useState(alunos);
    const [selectedAluno, setSelectedAluno] = useState<Aluno>();
    const [filteredCursos, setFilteredCursos] = useState(cursos);
    const [selectedCursos, setSelectedCursos] = useState<Curso>();
    const [msgError, setMsgError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchAlunos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/alunos`, {
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
            setAlunos(data.data);
            setFilteredAlunos(data.data);
        };
        const fetchCursos = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos`, {
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
            setCursos(data.data);
            setFilteredCursos(data.data);
        };
        fetchAlunos();
        fetchCursos();
    }, []);

    const handleSearchAluno = ({ term }: { term: string }) => {
        const filtered = alunos.filter((aluno) => {
            const matchesName = aluno.nome.toLowerCase().includes(term.toLowerCase());
            return matchesName;
        });
        setFilteredAlunos(filtered);
    };

    const handleCourseSearch = ({ term }: { term: string }) => {
        const filtered = cursos.filter((curso) => {
            const matchesName = curso.titulo.toLowerCase().includes(term.toLowerCase());
            return matchesName;
        });
        setFilteredCursos(filtered);
    };

    const handleMatricular = async () => {
        const formData = {
            aluno_id: selectedAluno?.id,
            curso_id: selectedCursos?.id
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/matriculas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) {
                setMsgError(data.message);
                return;
            }
            setSuccess(true);
        } catch (error) {
            //
        }
    };

    if (success) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-gray-800">Aluno matriculado com sucesso!</h1>
                    <button className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setSuccess(false)}>
                        Matricular outro aluno
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {msgError && <MsgError msg={msgError} />}
            <div className="flex flex-col items-center gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800">Matricular Aluno</h1>
                {step === 1 && (
                    <>
                        <div className="text-2xl font-semibold text-gray-700">1º Passo</div>
                        <div className="text-2xl font-semibold text-gray-700">Escolha um aluno</div>
                        <div className="flex flex-col gap-6 w-full max-w-md">
                            <SearchBar onSearch={handleSearchAluno} email={false} />
                            <select
                                name="aluno"
                                className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedAluno?.id || ""}
                                onChange={(e) => setSelectedAluno(alunos.find(aluno => aluno.id === Number(e.target.value)))}
                            >
                                <option value="">Selecione um aluno</option>
                                {filteredAlunos.map((aluno) => (
                                    <option key={aluno.id} value={aluno.id}>{aluno.nome} | {aluno.email}</option>
                                ))}
                            </select>
                        </div>
                        {selectedAluno && (
                            <>
                                <div className="text-2xl font-semibold text-center text-gray-700">
                                    Aluno selecionado:
                                    {filteredAlunos.find((aluno) => aluno.id === selectedAluno?.id) && (
                                        <CardProfile
                                            dados={filteredAlunos.find((aluno) => aluno.id === selectedAluno?.id)!}
                                            isStudent={true}
                                            onDelete={() => { }}
                                            btns={false}
                                        />
                                    )}
                                </div>
                                <button
                                    className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={() => setStep(2)}
                                >
                                    Próximo
                                </button>
                            </>
                        )}
                    </>
                )}
                {step === 2 && (
                    <>
                        <div className="text-2xl font-semibold text-gray-700">2º Passo</div>
                        <div className="text-2xl font-semibold text-gray-700">Escolha um curso</div>
                        <div className="flex flex-col gap-6 w-full max-w-md">
                            <SearchBar onSearch={handleCourseSearch} email={false} />
                            <select
                                name="curso"
                                className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={selectedCursos?.id || ""}
                                onChange={(e) => setSelectedCursos(cursos.find(curso => curso.id === Number(e.target.value)))}
                            >
                                <option value="">Selecione um curso</option>
                                {filteredCursos.map((curso) => (
                                    <option key={curso.id} value={curso.id}>{curso.titulo}</option>
                                ))}
                            </select>
                        </div>
                        {selectedCursos && (
                            <>
                                <div className="text-2xl font-semibold text-gray-700">
                                    Curso selecionado:
                                    <CardCursos
                                        dados={filteredCursos.find((curso) => curso.id === selectedCursos?.id)!}
                                        onDelete={() => { }}
                                        btns={false}
                                    />
                                </div>
                                <button
                                    className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={handleMatricular}
                                >
                                    Matricular
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    )
}