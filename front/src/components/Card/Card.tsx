import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
interface DadosAluno{
    aluno_mais_velho: string;
    aluno_mais_novo:string;
    media_idade: string;
    total_alunos: string
}

interface DadosCursos{
    curso_menos_alunos: string;
    curso_mais_alunos: string;
    total_cursos: string;
}
interface CardProps {
    title: string;
    color: string;
    textColor?: string;
    titleColor?: string;
    text: string;
    info?: string;
    dadosAlunos?: DadosAluno;
    dadosCursos?: DadosCursos;
}


function Card({ title, color, textColor, titleColor, text, info, dadosAlunos, dadosCursos }: CardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [toLink, setToLink] = useState("");

    useEffect(() => {
        if (title === "Alunos") {
            setToLink("/alunos");
        } else if (title === "Cursos") {
            setToLink("/cursos");
        } else if (title === "Professores") {
            setToLink("/professores");
        } else if (title === "Disciplinas") {
            setToLink("/disciplinas");
        } else if (title === "Matrículas") {
            setToLink("/matriculas");
        }
    })
    return (
        <div
            className={`group flex flex-col rounded-2xl w-[290px] ${color} shadow-xl hover:scale-105 transition-transform duration-300`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col p-8">
                <div
                    className={`text-2xl font-bold text-center ${titleColor != null ? titleColor : "text-[#374151]"} pb-6`}
                >
                    {title}
                </div>
                <div
                    className={`text-6xl text-center ${textColor != null ? textColor : "text-[#374151]"}`}
                >
                    {info != null ? info : "--"}
                </div>
                <div className={`text-lg text-center ${textColor != null ? textColor : "text-[#374151]"}`}>
                    {text}
                </div>
            </div>
            {title === "Alunos" ? (
                <div className="flex flex-row justify-center gap-4 flex-grow p-8">
                    <div className="flex flex-col justify-center items-center h-12">
                        <div className={`text-2xl font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>{dadosAlunos ? (dadosAlunos.media_idade != "0" ? dadosAlunos.media_idade : "--") : "--"}</div>
                        <div className={`text-sm text-center ${textColor != null ? textColor : "text-[#374151]"}`}>Idade média</div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-center h-12">
                        <div className={`text-2xl font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>{dadosAlunos ? dadosAlunos.aluno_mais_novo.split(" ")[0] : "--"}</div>

                        <div className={`text-sm text-center ${textColor != null ? textColor : "text-[#374151]"}`}>Menor idade</div>
                    </div>
                    <div className="flex flex-col justify-center items-center h-12">
                        <div className={`text-2xl font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>{dadosAlunos ? dadosAlunos.aluno_mais_velho.split(" ")[0] : "--"}</div>
                        <div className={`text-sm text-center ${textColor != null ? textColor : "text-[#374151]"}`}>Maior idade</div>
                    </div>
                </div>
            ) : title === "Cursos" ? (
                <div className="flex flex-row justify-center gap-4 flex-grow p-8">
                    <div className="flex flex-col justify-center items-center h-12">
                        <div className={`text-sm text-center  ${textColor != null ? textColor : "text-[#374151]"}`}>Menos alunos</div>
                        <div className={`text-2xl text-center font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>{dadosCursos ? dadosCursos.curso_menos_alunos : "--"}</div>
                    </div>
                    <div className="flex flex-col justify-center items-center h-12">
                        <div className={`text-sm text-center ${textColor != null ? textColor : "text-[#374151]"}`}>Mais alunos</div>
                        <div className={`text-2xl text-center font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>{dadosCursos ? dadosCursos.curso_mais_alunos : "--"}</div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row justify-center gap-4 flex-grow p-8">
                    <div className="flex flex-col justify-center items-center h-12">
                    </div>
                </div>
            )}

            <NavLink
                to={`/admin${toLink}`} className={`${isHovered ? "bg-[#FFF]" : color} rounded-2xl flex cursor-pointer justify-center items-center h-12 transition-all duration-00`} style={{ backgroundColor: color }}>
                <div className="text-sm">{isHovered ? "Ver" : ""}</div>
            </NavLink>
        </div>
    );
}

export default Card;