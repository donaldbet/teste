import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface CardProps {
    title: string;
    color: string;
    textColor?: string;
    titleColor?: string;
    text: string;
    info: string;
}

function Card({ title, color, textColor, titleColor, text, info }: CardProps) {
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
                    {info}
                </div>
                <div className={`text-lg text-center ${textColor != null ? textColor : "text-[#374151]"}`}>
                    {text}
                </div>
            </div>
            {title === "Alunos" ? (
                <div className="flex flex-row justify-center gap-4 flex-grow p-8">
                    <div className="flex flex-col justify-center items-center h-12">
                        <div className={`text-2xl font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>18</div>
                        <div className={`text-sm text-center ${textColor != null ? textColor : "text-[#374151]"}`}>Idade média</div>
                    </div>
                    <div className="flex flex-col justify-center items-center text-center h-12">
                        <div className={`text-2xl font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>18</div>
                        <div className={`text-sm text-center ${textColor != null ? textColor : "text-[#374151]"}`}>Menor idade</div>
                    </div>
                    <div className="flex flex-col justify-center items-center h-12">
                        <div className={`text-2xl font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>18</div>
                        <div className={`text-sm text-center ${textColor != null ? textColor : "text-[#374151]"}`}>Maior média</div>
                    </div>
                </div>
            ) : title === "Cursos" ? (
                <div className="flex flex-row justify-center gap-4 flex-grow p-8">
                    <div className="flex flex-col justify-center items-center h-12">
                        <div className={`text-sm text-center  ${textColor != null ? textColor : "text-[#374151]"}`}>Menos alunos</div>
                        <div className={`text-2xl text-center font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>Direito</div>
                    </div>
                    <div className="flex flex-col justify-center items-center h-12">
                        <div className={`text-sm text-center ${textColor != null ? textColor : "text-[#374151]"}`}>Mais alunos</div>
                        <div className={`text-2xl text-center font-bold ${textColor != null ? textColor : "text-[#374151]"}`}>Medicina</div>
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