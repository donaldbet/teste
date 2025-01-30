import { useEffect, useState } from "react";
import CardProfile from "../Card/CardProfile";
import MsgSuccess from "../MsgSuccess/MsgSuccess";
import MsgError from "../MsgError/MsgError";

interface Professor {
    nome: string;
    email?: string;
    id: number;
}

interface ProfessoresListProps {
    dados: Professor[];
}



export default function ProfessoresList({ dados }: ProfessoresListProps) {
    const [professores, setProfessores] = useState<Professor[]>(dados);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setProfessores(dados);
    }, [dados]);

    const onDelete = async (item: any) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/professores/${item.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
            });
            const data = await response.json();
            if (data.status === "success") {
                setSuccessMsg(data.message);
                setProfessores(professores.filter((professor) => professor.id !== item.id));
            } else {
                setErrorMsg(data.message);
            }
        } catch (error) {

        }
    };

    const onEdit = (item: any) => {
        console.log("Editando professor:", item);
    };


    return (
        <>
            {successMsg && <MsgSuccess msg={successMsg} />}
            {errorMsg && <MsgError msg={errorMsg} />}
            {professores.map((professor, index) => (
                <CardProfile key={index} dados={professor} isStudent={false} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </>
    )
}