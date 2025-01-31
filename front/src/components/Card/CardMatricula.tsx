import { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import BtnsEditDelete from "../EditDelete/BtnsEditDelete";

interface CardMatriculaProps {
    dados: {
        aluno: {
            id: number;
            nome: string;
        };
        curso: {
            id: number;
            titulo: string;
        };
        id: number;
        dataHora: string;
    },
    color?: string;
    onDelete: (item: any) => void;
}

export default function CardMatricula({ dados, color = "bg-[#000]", onDelete }: CardMatriculaProps) {

    const [openModal, setOpenModal] = useState(false);

    const toogleModal = () => {
        setOpenModal(!openModal);
    }

    return (
        <>
            <div className={`flex justify-center items-center cursor-pointer p-4 lg:p-8 sm:w-20 md:w-full lg:w-full ${color} rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out`} onClick={toogleModal}>
                <div className="flex flex-col text-5xl font-bold w-full text-center text-[#FFF] justify-center items-center">
                    <div className="flex text-5xl font-bold text-center text-[#FFF] justify-center items-center">
                        <FaUserGraduate />
                    </div>
                    <div className="flex flex-row items-center w-full gap-4 mt-4">
                        <div className="flex gap-6 font-bold w-50 text-center text-[#FFF]">
                            <div className="text-xl text-center text-[#FFF]">
                                {dados.aluno.nome}
                            </div>
                        </div>
                        <div className="flex gap-6 h-15 text-xl w-auto font-bold text-center text-[#FFF] border-l-2 border-[#009dd1] p-2 rounded-full">
                            <span className="h-full border-l-2 border-[#FFF]"></span>
                        </div>
                        <div className="flex gap-6 w-50 font-bold text-center p-2 rounded-full">
                            <div className="text-xl text-center text-[#FFF]">
                                {dados.curso.titulo}
                            </div>
                        </div>
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
                            <div className="flex flex-col lg:flex-row justify-center items-center text-center gap-4 mt-4">
                                <h3 className="text-xl font-bold">Aluno:</h3>
                                <h3 className="text-xl">{dados.aluno.nome}</h3>
                                <h3 className="text-xl font-bold">Disciplina:</h3>
                                <h3 className="text-xl">{dados.curso.titulo}</h3>
                            </div>
                            <div className="flex justify-center items-center mt-4 mb-4">
                                <span className="flex border-b-2 border-gray-300 w-300"></span>
                            </div>
                            <div className="flex items-center justify-center text-center gap-4 mt-4">
                                <h3 className="text-xl font-bold">Matriculado em:</h3>
                                <p className="text-xl">{dados.dataHora}</p>
                            </div>
                            <BtnsEditDelete item={{
                                nome_aluno: dados.aluno.nome,
                                nome_curso: dados.curso.titulo,
                                id: dados.id
                            }} onDelete={() => onDelete(dados)} isMatricula={true} isEdit={false} />
                        </div>
                    </div>
                </>
            )}
        </>
    )
}