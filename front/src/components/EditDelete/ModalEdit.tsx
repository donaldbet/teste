import { useEffect, useState } from "react";
import MsgError from "../MsgError/MsgError";
import MsgSuccess from "../MsgSuccess/MsgSuccess";

interface ModalEditProps {
    item: any;
    isOpen: boolean;
    toogleModal: () => void;
    isAluno?: boolean;
    isProfessor?: boolean;
    isCurso?: boolean;
    isDisciplina?: boolean;
    isMatricula?: boolean;
}

export default function ModalEdit({ item, isOpen, toogleModal, isAluno, isProfessor, isCurso, isDisciplina, isMatricula }: ModalEditProps) {
    const [editedItem, setEditedItem] = useState(item);
    const [toLink, setToLink] = useState("");
    const [msgError, setMsgError] = useState("");
    const [msgSuccess, setMsgSuccess] = useState("");

    useEffect(() => {
        if (isAluno) {
            setToLink(`${import.meta.env.VITE_API_URL}/alunos/${item.id}`);
        } else if (isProfessor) {
            setToLink(`${import.meta.env.VITE_API_URL}/professores/${item.id}`);
        } else if (isCurso) {
            setToLink(`${import.meta.env.VITE_API_URL}/cursos/${item.id}`);
        } else if (isDisciplina) {
            setToLink(`${import.meta.env.VITE_API_URL}/disciplinas/${item.id}`);
        } else if (isMatricula) {
            setToLink(`${import.meta.env.VITE_API_URL}/matriculas/${item.id}`);
        }
    }, [isAluno, isProfessor, isCurso, isDisciplina, isMatricula]);
    const handleSave = async () => {
        let formData = {}
        if (isAluno || isProfessor) {
            if (editedItem.data_nascimento && editedItem.data_nascimento != "") {
                formData = {
                    nome: editedItem.nome,
                    email: editedItem.email,
                    data_nascimento: editedItem.data_nascimento
                }
            } else {
                formData = {
                    nome: editedItem.nome,
                    email: editedItem.email
                };
            }
        } else if (isCurso) {
            formData = {
                titulo: editedItem.titulo,
                descricao: editedItem.descricao,
                data_inicio: editedItem.data_inicio,
                data_fim: editedItem.data_fim
            };
        }
        try {
            const response = await fetch(`${toLink}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                method: "PUT",
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.status === "success") {
                window.location.reload();
            } else {
                setMsgError(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {msgError && (
                <MsgError msg={msgError} />
            )}
            {msgSuccess && (
                <MsgSuccess msg={msgSuccess} />
            )}
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50" onClick={toogleModal}>
                <div className="bg-white p-6 rounded-lg shadow-lg w-150 relative" onClick={(e) => e.stopPropagation()}>
                    <button className="absolute text-6xl top-2 right-2 text-gray-500 hover:text-gray-700" onClick={toogleModal}>
                        &times;
                    </button>

                    <h2 className="text-2xl text-center font-bold mb-4">Editar Item</h2>
                    <div className="flex flex-col gap-4">
                        {(isAluno || isProfessor) && (
                            <>
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <label htmlFor="nome">Nome:</label>
                                    <input
                                        name="nome"
                                        type="text"
                                        className="w-full p-2 border justify-center rounded-md"
                                        value={editedItem.nome}
                                        onChange={(e) => setEditedItem({ ...editedItem, nome: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        name="email"
                                        type="text"
                                        className="w-full p-2 border justify-center rounded-md"
                                        value={editedItem.email}
                                        onChange={(e) => setEditedItem({ ...editedItem, email: e.target.value })}
                                    />
                                </div>
                                {isAluno && (
                                    <div className="flex justify-center items-center gap-4 mb-4">
                                        <label htmlFor="data_nascimento">Data de nascimento:</label>
                                        <input
                                            name="data_nascimento"
                                            type="date"
                                            className="w-full p-2 border justify-center rounded-md"
                                            value={editedItem.data_nascimento}
                                            onChange={(e) => setEditedItem({ ...editedItem, data_nascimento: e.target.value })}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                        {isCurso && (
                            <>
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <label htmlFor="nome">Titulo:</label>
                                    <input
                                        required
                                        name="titulo"
                                        type="text"
                                        className="w-full p-2 border justify-center rounded-md"
                                        value={editedItem.titulo}
                                        onChange={(e) => setEditedItem({ ...editedItem, titulo: e.target.value })}
                                    />
                                </div><div className="flex justify-center items-center gap-4 mb-4">
                                    <label htmlFor="nome">Descrição:</label>
                                    <input
                                        required
                                        name="descricao"
                                        type="text"
                                        className="w-full p-2 border justify-center rounded-md"
                                        value={editedItem.descricao}
                                        onChange={(e) => setEditedItem({ ...editedItem, descricao: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <label htmlFor="data_nascimento">Data de início:</label>
                                    <input
                                        required
                                        name="data_inicio"
                                        type="date"
                                        className="w-full p-2 border justify-center rounded-md"
                                        value={editedItem.data_inicio}
                                        onChange={(e) => setEditedItem({ ...editedItem, data_inicio: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <label htmlFor="data_fim">Data final:</label>
                                    <input
                                        name="data_fim"
                                        type="date"
                                        className="w-full p-2 border justify-center rounded-md"
                                        value={editedItem.data_fim}
                                        onChange={(e) => setEditedItem({ ...editedItem, data_fim: e.target.value })}
                                    />
                                </div>
                            </>
                        )}
                        {isMatricula && (
                            <>
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <label htmlFor="nome">Aluno:</label>
                                    <input
                                        required
                                        name="aluno"
                                        type="text"
                                        className="w-full p-2 border justify-center rounded-md"
                                        value={editedItem.aluno}
                                        onChange={(e) => setEditedItem({ ...editedItem, aluno: e.target.value })}
                                    />
                                </div>
                                <div className="flex justify-center items-center gap-4 mb-4">
                                    <label htmlFor="nome">Curso:</label>
                                    <input
                                        required
                                        name="curso"
                                        type="text"
                                        className="w-full p-2 border justify-center rounded-md"
                                        value={editedItem.curso}
                                        onChange={(e) => setEditedItem({ ...editedItem, curso: e.target.value })}
                                    />
                                </div>
                            </>
                        )}


                    </div>
                    <div className="flex justify-end gap-2">
                        <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={toogleModal}>
                            Cancelar
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSave}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
