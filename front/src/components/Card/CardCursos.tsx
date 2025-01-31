import { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import BtnsEditDelete from "../EditDelete/BtnsEditDelete";

interface Disciplina {
    professor_id: number;
    curso_id: number;
    titulo: string;
    descricao: string;
    id: number;
}

interface CardCursosProps {
    dados: {
        titulo: string;
        descricao?: string;
        id: number;
        data_inicio?: string;
        data_fim?: string;
        professor_id?: number;
        curso_id?: number;
    }
    color?: string;
    textColor?: string;
    onDelete: (item: any) => void;
    btns?: boolean;
    isCurso?: boolean;
}

export default function CardCursos({ dados, color = "bg-[#ffee00]", textColor = "text-[#374151]", onDelete, btns = true, isCurso = true }: CardCursosProps) {
    const [professor, setProfessor] = useState("");
    const [curso, setCurso] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();

    const toogleModal = () => {
        setOpenModal(!openModal);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!isCurso) {
                try {
                    let response = await fetch(`${import.meta.env.VITE_API_URL}/professores/${dados.professor_id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    let data = await response.json();
                    setProfessor(data.data.nome);
                    response = await fetch(`${import.meta.env.VITE_API_URL}/cursos/${dados.curso_id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    data = await response.json();
                    setCurso(data.data.titulo);
                } catch (error) {
                    //
                }
            } else {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos/${dados.id}/disciplinas`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = await response.json();
                    setDisciplinas(data.data);
                } catch (error) {
                    //
                }
            }
        }
        fetchData();
    }, [isCurso]);

    return (
        <>
            <div className={`flex justify-center items-center cursor-pointer ${color} p-5 sm:w-full md:w-full lg:w-full $ rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out`} onClick={toogleModal}>
                <div className="flex flex-row items-center gap-4">
                    <div className={`flex text-5xl font-bold w-20 text-center ${textColor} justify-center items-center`}>
                        <FaGraduationCap />
                    </div>
                    <div className={`flex text-xl font-bold w-full text-center ${textColor}`}>
                        {dados.titulo}
                    </div>
                </div>
            </div>
            {openModal && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={toogleModal}>
                        <div className="z-50 bg-white p-8 rounded-lg shadow-lg relative w-100 max-w-250 sm:w-150 max-h-12/14 h-auto  overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <button className="text-6xl absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={toogleModal}>
                                &times;
                            </button>
                            <h2 className="text-4xl text-center font-bold mb-4">{dados.titulo}</h2>
                            {isCurso && (
                                <div className="flex flex-col lg:flex-row items-center text-center gap-4 mt-4">
                                    <h3 className="text-xl font-bold">Data início:</h3>
                                    <h3 className="text-xl">{dados.data_inicio}</h3>
                                    <h3 className="text-xl font-bold">Data Final:</h3>
                                    <h3 className="text-xl">{dados.data_fim}</h3>
                                </div>
                            )}
                            {!isCurso && (
                                <div className="flex items-center text-center gap-4 mt-4">
                                    <h3 className="text-xl font-bold">Professor:</h3>
                                    <h3 className="text-xl">{professor}</h3>
                                    <h3 className="text-xl font-bold">Curso:</h3>
                                    <h3 className="text-xl">{curso}</h3>
                                </div>
                            )}

                            {dados.descricao && (
                                <>
                                    <div className="flex justify-center items-center mt-4 mb-4">
                                        <span className="flex border-b-2 border-gray-300 w-200"></span>
                                    </div>
                                    <div className="flex items-center text-center gap-4 mt-4">
                                        <h3 className="text-xl font-bold">Descrição:</h3>
                                        <h3 className="text-xl">{dados.descricao}</h3>
                                    </div>

                                </>
                            )}
                            {isCurso && (
                                <>
                                    <div className="flex justify-center items-center mt-4 mb-4">
                                        <span className="flex border-b-2 border-gray-300 w-300"></span>
                                    </div>
                                    <div className="flex flex-col items-center text-center gap-4 mt-4">
                                        <h3 className="text-xl  font-bold">Disciplinas:</h3>
                                        <div className="grid lg:grid-cols-2 gap-4">
                                            {disciplinas?.map((disciplina) => (
                                                <>
                                                    <div className={`flex justify-center items-center cursor-pointer bg-[#ae00d1] p-5 sm:w-full md:w-full lg:w-full $ rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out`}>
                                                        <div className="flex flex-row items-center gap-4">
                                                            <div className={`flex text-5xl font-bold w-20 text-center text-[#FFF] justify-center items-center`}>
                                                                <FaGraduationCap />
                                                            </div>
                                                            <div className={`flex text-xl font-bold w-full text-center text-[#FFF]`}>
                                                                {disciplina.titulo}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                            {btns && (
                                <BtnsEditDelete item={{
                                    titulo: dados.titulo,
                                    descricao: dados.descricao,
                                    data_inicio: dados.data_inicio,
                                    professor: dados.professor_id,
                                    curso: dados.curso_id,
                                    data_fim: dados.data_fim,
                                    id: dados.id
                                }} onDelete={() => onDelete(dados)} isCurso={isCurso} isDisciplina={!isCurso} />
                            )}
                        </div>
                    </div>
                </>
            )}

        </>
    )
}
