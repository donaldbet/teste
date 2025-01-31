import { useEffect, useState } from "react";
import Card from "../../../components/Card/Card";

interface DadosAluno {
    aluno_mais_velho: string;
    aluno_mais_novo: string;
    media_idade: string;
    total_alunos: string
}

interface DadosProfessores {
    total: string;
}
interface DadosCursos {
    curso_menos_alunos: string;
    curso_mais_alunos: string;
    total_cursos: string;
}
interface DadosDisciplinas {
    total: string;
}
interface DadosMatriculas {
    total: string;
}

function Dashboard() {

    const [dadosAlunos, setDadosAlunos] = useState<DadosAluno>();
    const [dadosProfessores, setDadosProfessores] = useState<DadosProfessores>();
    const [dadosCursos, setDadosCursos] = useState<DadosCursos>();
    const [dadosMatriculas, setDadosMatriculas] = useState<DadosMatriculas>();
    const [dadosDisciplinas, setDadosDisciplinas] = useState<DadosDisciplinas>();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setDadosAlunos(data.data.aluno);
                setDadosCursos(data.data.curso);
                setDadosMatriculas(data.data.matricula);
                setDadosDisciplinas(data.data.disciplina);
                setDadosProfessores(data.data.professor);
            } catch (error) {
                //            
            }
        }
        fetchDashboard();
    }, [])

    return (
        <>
            <div className="flex justify-center items-center p-5">
                <h1 className="text-4xl font-bold text-[#374151]">Dashboard</h1>
            </div>
            <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-5">
                <Card color="bg-[#61eb34]" title="Alunos" info={dadosAlunos?.total_alunos} dadosAlunos={dadosAlunos} text="Número de alunos" /> {/* Alunos */}
                <Card color="bg-[#b53636]" title="Professores" info={dadosProfessores?.total} titleColor="text-[#FFF]" textColor="text-[#FFF]" text="Número de professores" /> {/* Professores */}
                <Card color="bg-[#ffee00]" title="Cursos" info={dadosCursos?.total_cursos} dadosCursos={dadosCursos} text="Número de cursos" /> {/* Cursos */}
                <Card color="bg-[#009dd1]" title="Matrículas" info={dadosMatriculas?.total} text="Número de matrículas" titleColor="text-[#FFF]" textColor="text-[#FFF]" />{/* Matrículas */}
                <Card color="bg-[#ae00d1]" title="Disciplinas" info={dadosDisciplinas?.total} text="Número de disciplinas" titleColor="text-[#FFF]" textColor="text-[#FFF]" /> {/* Disciplinas */}
            </div>
        </>
    );
}

export default Dashboard;