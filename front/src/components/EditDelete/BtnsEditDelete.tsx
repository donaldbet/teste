import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import ModalEdit from "./ModalEdit";

interface BtnsEditDeleteProps {
    item: any;
    onDelete: (item: any) => void;
    isEdit?: boolean;
    isAluno?: boolean;
    isProfessor?: boolean;
    isCurso?: boolean;
    isDisciplina?: boolean;
    isMatricula?: boolean;
}

export default function BtnsEditDelete({ item, onDelete, isEdit = true, isAluno, isProfessor, isCurso, isDisciplina, isMatricula }: BtnsEditDeleteProps) {
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState<"delete" | "edit" | "">("");
    const toogleModal = () => {
        setOpenModal(!openModal);
    }

    const toogleModalType = (type: "delete" | "edit" | "") => {
        setModalType(type);
    }

    const handleDelete = (item: any) => {
        if (!openModal) {
            toogleModal();
            toogleModalType("delete");
        } else {
            if (onDelete) {
                onDelete(item);
            }
            toogleModal();
        }
    }

    const handleEdit = () => {
        if (!openModal) {
            toogleModal();
            toogleModalType("edit");
        } else {
            toogleModal();
        }
    }

    return (
        <>
            <div className="flex fixed bottom-5 left-1/2 transform -translate-x-1/2 justify-center items-center lg:space-x-12 space-x-60">
                {!openModal && (
                    <>
                        {isEdit && (
                            <div className="bg-[#009dd1] lg:w-40 p-4 rounded-full flex gap-4 justify-center items-center hover:bg-[#007f9d] hover:shadow-xl transition-all duration-300 ease-in-out" onClick={handleEdit}>
                                <FaPencil className="text-white text-xl flex justify-center items-center" />
                                <div className="hidden lg:flex text-white text-2xl font-bold">Editar</div>
                            </div>
                        )}

                        <div className="bg-[#c92200] lg:w-40 p-4 rounded-full flex gap-4 justify-center items-center hover:bg-[#851600] hover:shadow-xl transition-all duration-300 ease-in-out" onClick={handleDelete}>
                            <FaTrash className="text-white text-xl flex justify-center items-center" />
                            <div className="hidden lg:flex text-white text-2xl font-bold">Excluir</div>
                        </div>
                    </>
                )}
                {openModal && (modalType === "delete") && (
                    <div className="flex flex-col h-40 bg-[#021c59] text-[#ffffff] rounded-lg w-[500px] shadow-2xl">
                        <div className="flex flex-col h-40 rounded-lg w-[500px] bg-[#0037b6] text-[#ffffff]">
                            <div className="flex flex-row w-full gap-5 justify-center items-center px-5 w-full h-full">
                                <div className="my-auto text-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-alert-circle" width="62" height="62">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" x2="12" y1="8" y2="12"></line>
                                        <line x1="12" x2="12.01" y1="16" y2="16"></line>
                                    </svg>
                                </div>
                                <div>
                                    <div className="font-bold text-2xl">Deseja realmente excluir?</div>
                                    <div className=" text-base">Essa ação não pode ser desfeita!</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-5 justify-center items-center p-5 w-full h-full">
                            <button className="flex bg-[#c92200] p-2 rounded-lg hover:bg-[#851600] transition-all duration-300 ease-in-out" onClick={() => handleDelete(item)}>Excluir</button>
                            <button className="flex bg-[#009dd1] p-2 rounded-lg hover:bg-[#007f9d] transition-all duration-300 ease-in-out" onClick={toogleModal}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
            {openModal && modalType === "edit" && (
                <ModalEdit
                    item={item}
                    isOpen={openModal}
                    toogleModal={toogleModal}
                    isAluno={isAluno}
                    isProfessor={isProfessor}
                    isCurso={isCurso}
                    isDisciplina={isDisciplina}
                    isMatricula={isMatricula}
                />
            )}
        </>
    )

}