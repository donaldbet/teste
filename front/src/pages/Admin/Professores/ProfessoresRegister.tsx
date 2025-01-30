import { useState } from "react";
import MsgError from "../../../components/MsgError/MsgError";

export default function ProfessoresRegister() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [msgError, setMsgError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const hasNumber = /\d/;
        if (hasNumber.test(nome)) {
            setMsgError("Nome não pode conter números");
            document.getElementsByName("nome")[0].focus();
            return;
        }
        if (!email.includes('@')) {
            setMsgError("Email inválido");
            document.getElementsByName("email")[0].focus();
            return;
        }
        try {
            const formData = {
                nome: nome,
                email: email
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/professores`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                console.error("Erro ao cadastrar professor");
                const data = await response.json();
                console.log(data.message);
                setMsgError(data.message);
                return;
            }
            const data = await response.json();
            if (data.status === 'success') {
                setSuccess(true);
                setNome("");
                setEmail("");
            }
        } catch (error) {
            console.error("Erro ao cadastrar professor");
            console.error(error);
        }
    }
    if (success) {
        return (
            <div className="flex flex-col items-center gap-8 p-8 bg-gray-100 rounded-lg shadow-md h-screen">
                <h1 className="text-4xl font-bold text-gray-800">Professor cadastrado com sucesso!</h1>
                <button className="p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setSuccess(false)}>
                    Cadastrar outro professor
                </button>
            </div>
        )
    }

    return (
        <>
        {msgError && <MsgError msg={msgError} />}
            <div className="flex flex-col items-center gap-8 p-8 bg-gray-100 rounded-lg shadow-md h-screen">
                <h1 className="text-4xl font-bold text-gray-800">Cadastrar Professor</h1>
                <div className="flex flex-col gap-6 w-full max-w-md">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-lg font-medium text-gray-700">Nome:</label>
                        <input
                            required
                            name="nome"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-lg font-medium text-gray-700">Email:</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
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