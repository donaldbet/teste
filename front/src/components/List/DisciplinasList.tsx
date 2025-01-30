import { useEffect, useState } from "react";
import CardCursos from "../Card/CardCursos";

interface Disciplina {
    id: number;
    titulo: string;
    descricao?: string;
    curso?: string;
    professor?: string;
}

interface DisciplinaListProps {
    dados: Disciplina[];
}

export default function DisciplinaList({ dados }: DisciplinaListProps ) {
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

    useEffect(() => {
        setDisciplinas(dados);
    }, [dados]);

    const onDelete = (item: any) => {
        console.log("Deletando disciplina:", item);
    };

    const onEdit = (item: any) => {
        console.log("Editando disciplina:", item);
    };


    return (
        <>
            {disciplinas.map((disciplina, index) => (
                <CardCursos key={index} dados={disciplina} onDelete={onDelete} color={"bg-[#ae00d1]"} textColor={"text-[#FFF]"} onEdit={onEdit} isCurso={false}/>
            ))}
        </>
    )
}