import { useEffect, useState } from "react";
import MsgSuccess from "../MsgSuccess/MsgSuccess";
import MsgError from "../MsgError/MsgError";
import CardMatricula from "../Card/CardMatricula";

interface Matricula {
    id: number;
    aluno: {
        id: number;
        nome: string;
    };
    curso: {
        id: number;
        titulo: string;
    };
}

interface MatriculasListProps {
    dados: Matricula[];
}

export default function MatriculasList({ dados }: MatriculasListProps) {

    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setMatriculas(dados);
    }, [dados]);

    const onDelete = async (item: any) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/matriculas/${item.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (data.status === "success") {
                setSuccessMsg(data.message);
                setMatriculas(matriculas.filter((matricula) => matricula.id !== item.id));
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
            {matriculas.map((matricula, index) => (
                <CardMatricula key={index} dados={matricula} onDelete={onDelete} onEdit={onEdit} color="bg-[#009dd1]"/>
            ))}
        </>
    )
}