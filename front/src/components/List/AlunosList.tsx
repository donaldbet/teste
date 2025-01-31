import { useEffect, useState } from "react";
import CardProfile from "../Card/CardProfile";
import MsgSuccess from "../MsgSuccess/MsgSuccess";
import MsgError from "../MsgError/MsgError";

interface Aluno{
    nome: string;
    email?: string;
    data_nascimento?: string;
    id: number;
}

interface AlunosListProps {
    dados:Aluno[];
    selectable?: boolean;
}



export default function AlunosList({ dados }: AlunosListProps) {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {       
        setAlunos(dados);
    }, [dados]);

    const onDelete = async (item: any) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/alunos/${item.id}`, {
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
                setAlunos(alunos.filter((aluno) => aluno.id !== item.id));
            }else{
                setErrorMsg(data.message);
            }
        } catch (error) {
            
        }
    };

    return (
        <>
            {successMsg && <MsgSuccess msg={successMsg} />}
            {errorMsg && <MsgError msg={errorMsg} />}
            {alunos.map((aluno, index) => (
                <CardProfile key={index} dados={aluno} isStudent={true} onDelete={onDelete}/>
            ))}
        </>
    )
}