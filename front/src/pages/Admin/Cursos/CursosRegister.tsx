import { useState } from "react";
import MsgError from "../../../components/MsgError/MsgError";
import MsgSuccess from "../../../components/MsgSuccess/MsgSuccess";

export default function CursosRegister() {

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data_inicio, setDataInicio] = useState('');
    const [data_fim, setDataFim] = useState('');
    const [msgError, setMsgError] = useState('');
    const [msgSuccess, setMsgSuccess] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = {
                titulo: titulo,
                descricao: descricao,
                data_inicio: data_inicio,
                data_fim: data_fim
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                console.error("Erro ao cadastrar curso");
                const data = await response.json();
                setMsgError(data.message);
                return;
            }
            const data = await response.json();
            if (data.status === 'success') {
                setMsgSuccess("Curso cadastrado com sucesso");
                setSuccess(true);
            }
        } catch (error) {
            console.error("Erro ao cadastrar curso");
            console.error(error);
        }
    }
    if (success) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col items-center gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-gray-800">Curso cadastrado com sucesso!</h1>
                    <button className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setSuccess(false)}>
                        Cadastrar outro curso
                    </button>
                </div>
            </div>
        )
    }
    return (
        <>
            {msgError && <MsgError msg={msgError} />}
            {msgSuccess && <MsgSuccess msg={msgSuccess} />}
            <div className="flex flex-col items-center gap-8 p-8 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800">Cadastrar Curso</h1>
                <div className="flex flex-col gap-6 w-full max-w-md">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-lg font-medium text-gray-700">Título:</label>
                        <input
                            required
                            name="titulo"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-lg font-medium text-gray-700">Descrição:</label>
                        <input
                            required
                            name="descricao"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="data_inicio" className="text-lg font-medium text-gray-700">Data de início:</label>
                        <input
                            required
                            name="data_inicio"
                            type="date"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setDataInicio(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="data_fim" className="text-lg font-medium text-gray-700">Data final:</label>
                        <input
                            required
                            name="data_fim"
                            type="date"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setDataFim(e.target.value)}
                        />
                    </div>
                    <button className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleSubmit}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </>
    )
}