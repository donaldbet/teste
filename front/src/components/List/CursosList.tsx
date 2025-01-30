import { useEffect, useState } from "react";
import CardCursos from "../Card/CardCursos";
import MsgSuccess from "../MsgSuccess/MsgSuccess";
import MsgError from "../MsgError/MsgError";

interface Curso {
    titulo: string;
    descricao?: string;
    data_inicio?: string;
    data_fim?: string;
    id: number;
}

interface CursosListProps {
    dados: Curso[];
}

export default function CursosList({ dados }: CursosListProps) {

    const [cursos, setCursos] = useState<Curso[]>([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setCursos(dados);
    }, [dados]);

    const onDelete = async (item: any) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos/${item.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.status === "success") {
                setSuccessMsg(data.message);
                setCursos(cursos.filter((curso) => curso.id !== item.id));
            } else {
                setErrorMsg(data.message);
            }
        } catch (error) {

        }
    };

    const onEdit = (item: any) => {
        console.log("Editando curso:", item);
    };


    return (
        <>
            {successMsg && <MsgSuccess msg={successMsg} />}
            {errorMsg && <MsgError msg={errorMsg} />}
            {cursos.map((curso, index) => (
                <CardCursos key={index} dados={curso} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </>
    )
}