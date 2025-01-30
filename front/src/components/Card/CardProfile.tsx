import { useEffect, useState } from "react";
import BtnsEditDelete from "../EditDelete/BtnsEditDelete";
import { PiStudentFill } from "react-icons/pi";

interface StudentCardProps {
    dados: {
        nome: string;
        email?: string;
        data_nascimento?: string;
        id: number;
    },
    isStudent?: boolean;
    onDelete: (item: any) => void;
    onEdit: (item: any) => void;
    btns?: boolean;
}

export default function CardProfile({ dados, isStudent, onDelete, onEdit, btns = true }: StudentCardProps) {

    const [openModal, setOpenModal] = useState(false);
    const [textColor, setTextColor] = useState("text-[#374151]");
    useEffect(() => {
        console.log("Dados de aluno CF:", dados);
        if (isStudent) {
            setTextColor("text-[#374151]");
        } else {
            setTextColor("text-[#FFF]");
        }
    }, [])
    const toogleModal = () => {
        setOpenModal(!openModal);
    }
    const handleOpenModal = () => {
        if (document.getElementById("btn_register")?.classList.contains("hidden")) {
            document.getElementById("btn_register")?.classList.remove("hidden");
        } else {
            document.getElementById("btn_register")?.classList.add("hidden");
        }
        if (document.getElementById("btn_filter")?.classList.contains("hidden")) {
            document.getElementById("btn_filter")?.classList.remove("hidden");
        } else {
            document.getElementById("btn_filter")?.classList.add("hidden");
        }
        toogleModal();
    }

    return (
        <>
            <div className={`flex justify-center items-center p-5 sm:w-full md:w-full cursor-pointer lg:w-full ${isStudent ? "bg-[#61eb34]" : "bg-[#b53636]"} rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out`} onClick={handleOpenModal}>
                <div className="flex flex-col items-center gap-4">
                    <PiStudentFill className={`w-20 h-20 ${textColor}`} />
                    <div className={`text-xl font-bold w-full text-center ${textColor}`}>{dados.nome}</div>
                    <div className={`text-small w-full text-center ${textColor}`}>{dados.email}</div>
                </div>
            </div>
            {openModal && (

                <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50" onClick={handleOpenModal}>
                    <div className="z-50 bg-white p-8 rounded-lg shadow-lg relative sm:w-100 sm:h-auto h-auto lg:w-150 max-h-12/14 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <button className="text-6xl absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer" onClick={handleOpenModal}>
                            &times;
                        </button>
                        <h2 className="text-4xl text-center font-bold mb-4">{dados.nome}</h2>
                        <div className="flex items-center text-center gap-4 mt-4">
                            <h3 className="text-xl font-bold">Email:</h3>
                            <h3 className="text-xl">{dados.email}</h3>
                        </div>
                        <div className="flex justify-center items-center mt-4 mb-4">
                            <span className="flex border-b-2 border-gray-300 w-300"></span>
                        </div>
                        <div className="flex items-center text-center gap-4 mt-4">
                            <h3 className="text-xl font-bold">Data de Nascimento:</h3>
                            <h3 className="text-xl">{dados.data_nascimento ? dados.data_nascimento : "Não informado"}</h3>
                        </div>
                        {btns && (
                            <BtnsEditDelete
                                item={{
                                    nome: dados.nome,
                                    email: dados.email,
                                    data_nascimento: dados.data_nascimento,
                                    id: dados.id
                                }}
                                onEdit={() => onEdit(dados)}
                                onDelete={() => {
                                    handleOpenModal();
                                    onDelete(dados)
                                }}
                                isAluno={isStudent}
                                isProfessor={!isStudent}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}