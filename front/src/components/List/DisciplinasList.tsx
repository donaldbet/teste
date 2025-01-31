import { useEffect, useState } from "react";
import CardCursos from "../Card/CardCursos";
import MsgSuccess from "../MsgSuccess/MsgSuccess";
import MsgError from "../MsgError/MsgError";

interface Disciplina {
    id: number;
    titulo: string;
    descricao?: string;
    curso_id?: number;
    professor_id?: number;
}

interface DisciplinaListProps {
    dados: Disciplina[];
}

export default function DisciplinaList({ dados }: DisciplinaListProps) {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setDisciplinas(dados);
    }, [dados]);

    const onDelete = async (item: any) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/disciplinas/${item.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            });
            const data = await response.json();
            if (data.status === "success") {
                setSuccessMsg(data.message);
                setDisciplinas(disciplinas.filter((disciplina) => disciplina.id !== item.id));
            } else {
                setErrorMsg(data.message);
            }
        } catch (error) {

        }
    };

    return (
        <>
            {successMsg && <MsgSuccess msg={successMsg} />}
            {errorMsg && <MsgError msg={errorMsg} />}
            {disciplinas.map((disciplina, index) => (
                <CardCursos key={index} dados={disciplina} onDelete={onDelete} color={"bg-[#ae00d1]"} textColor={"text-[#FFF]"}  isCurso={false} />
            ))}
        </>
    )
}