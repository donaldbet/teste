import { useEffect, useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import MsgError from "../../components/MsgError/MsgError";

interface Curso {
    titulo: string;
    descricao?: string;
    data_inicio?: string;
    data_fim?: string;
    id: number;
}

interface Disciplina {
    id: number;
    titulo: string;
    descricao?: string;
    curso_id?: number;
    professor_id?: number;
}

interface AlunoDados {
    nome: string;
    email?: string;
    data_nascimento?: string;
    id: number;
}


export default function Aluno() {
    const [aluno, setAluno] = useState<AlunoDados>();
    const [disciplinas, setDisciplinas] = useState<Disciplina[]>();
    const [cursos, setCursos] = useState<Curso[]>();
    const [editionMode, setEditionMode] = useState(false);
    const [changePasswordMode, setChangePasswordMode] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msgError, setMsgError] = useState("");

    const formatDateToInput = (dateString: string) => {
        if (!dateString) return "";

        const parts = dateString.split("/");
        if (parts.length !== 3) return dateString;

        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    };

    const handleEdit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/aluno/${localStorage.getItem('id')}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    data_nascimento: dataNascimento
                })
            });
            const data = await response.json();
            if (data.status === "success") {
                window.location.reload();
            }
        } catch (error) {

        }
    }

    const handleNewPassword = async (e: any) => {
        e.preventDefault();
        if(newPassword !== confirmPassword){
            setMsgError("As senhas não coincidem");
            setConfirmPassword("");
            setNewPassword("");
            setCurrentPassword("");
            return;
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/aluno/change_password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword
            })
        });
        const data = await response.json();
        if (data.status === "success") {
            setMsgError("Senha alterada com sucesso");
            window.location.reload();
        } else {
            setMsgError(data.message);
            setConfirmPassword("");
            setNewPassword("");
            setCurrentPassword("");
        }
    }

    useEffect(() => {
        const fetchAluno = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/aluno/${localStorage.getItem('id')}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setAluno(data.data);
            setNome(data.data.nome);
            setEmail(data.data.email);
            if (data.data.data_nascimento) {
                setDataNascimento(data.data.data_nascimento);
            }
        }
        const fetchData = async () => {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/aluno/${localStorage.getItem('id')}/disciplinas_cursos/`, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setDisciplinas(data.data.disciplinas);
            setCursos(data.data.cursos);
        };
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (isAdmin) {
            window.location.href = '/admin';
        }
        fetchAluno();
        fetchData();
    }, []);

    useEffect(() => {
        if (msgError) {
            const timer = setTimeout(() => {
                setMsgError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [msgError]);

    return (
        <>
            {msgError && <MsgError msg={msgError} />}
            {(editionMode && !changePasswordMode) && (
                <div className="flex justify-center items-center h-auto mt-10">
                    <div className="w-200 justify-center items-center p-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-4 text-center">Edite suas informações</h1>
                        <form className="aluno-form space-y-4">
                            <div className="form-group">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome:</label>
                                <input type="text" id="name" name="name" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={nome} onChange={(e) => setNome(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Data de Nascimento:</label>
                                <input type="date" id="birthdate" name="birthdate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value={formatDateToInput(dataNascimento)} onChange={(e) => setDataNascimento(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleEdit}>Salvar</button>
                        </form>

                        <button className="btn btn-secondary mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onClick={() => {
                            setEditionMode(false)
                            setChangePasswordMode(true)
                        }}>Mudar Senha</button>
                        <div className="flex justify-center items-center mt-4 mb-4">
                            <span className="flex border-b-2 border-gray-300 w-50 lg:w-300"></span>
                        </div>
                        <button className="btn btn-secondary mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={() => setEditionMode(false)}>Cancelar</button>
                    </div>
                </div>
            )}
            {(!editionMode && !changePasswordMode) && (
                <>
                    <div className="flex justify-center items-center h-auto mt-10">
                        <div className="w-200 justify-center items-center p-6 bg-white rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold mb-4 text-center">Suas informações</h1>
                            <div className="flex flex-col items-center gap-4">
                                <PiStudentFill className="w-20 h-20 text-[#374151]" />
                                <div className="text-xl font-bold w-full text-center text-[#374151]">{aluno ? aluno.nome : "Nome do Aluno"}</div>
                                <div className="text-small w-full text-center text-[#374151]">
                                    <div className="text-sm w-full text-center text-[#374151]">{aluno ? aluno.email : "Email do Aluno"}</div>
                                    <div className="text-sm w-full text-center text-[#374151]">{aluno ? (aluno.data_nascimento ? aluno.data_nascimento : "") : "Data de nascimento"}</div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center mt-4 mb-4">
                                <span className="flex border-b-2 border-gray-300 w-50 lg:w-300"></span>
                            </div>
                            <div className="flex flex-col items-center justify-center mt-4">
                                <h2 className="text-xl font-bold mb-2 text-center">Cursos</h2>
                                {cursos && (
                                    <>
                                        {cursos.map((curso) => (
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                                <div className={`flex justify-center items-center cursor-pointer bg-[#ffee00] p-5 sm:w-full md:w-full lg:w-full $ rounded-2xl hover:shadow-2xl transition-all duration-300 ease-in-out`}>
                                                    <div className="flex flex-row items-center gap-4">
                                                        <div className={`flex text-5xl font-bold w-20 text-center text-[#000] justify-center items-center`}>
                                                            <FaGraduationCap />
                                                        </div>
                                                        <div className={`flex text-xl font-bold w-full text-center text-[#000]`}>
                                                            {curso.titulo}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className="flex flex-col items-center mt-4">
                                <h2 className="text-xl font-bold mb-2 text-center">Disciplinas</h2>
                                {disciplinas && (
                                    <>
                                        {disciplinas.map((disciplina) => (
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <button className="btn btn-primary mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setEditionMode(true)}>Editar Informações</button>
                        </div>
                    </div>
                </>
            )}
            {changePasswordMode && (
                <>
                    <div className="flex justify-center items-center h-auto mt-10">
                        <div className="w-200 justify-center items-center p-6 bg-white rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold mb-4 text-center">Mudar Senha</h1>
                            <form className="aluno-form space-y-4" onSubmit={handleNewPassword}>
                                <div className="form-group">
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Senha Atual:</label>
                                    <input type="password" id="currentPassword" name="currentPassword" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required value={currentPassword} onChange={(e) => {
                                        setCurrentPassword(e.target.value);
                                    }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nova Senha:</label>
                                    <input type="password" id="newPassword" name="newPassword" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required value={newPassword} onChange={(e) => {
                                        setNewPassword(e.target.value);
                                    }} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirme a Nova Senha:</label>
                                    <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required value={confirmPassword} onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }} />
                                </div>
                                <button type="submit" className="btn btn-primary w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={handleNewPassword}>Salvar</button>
                            </form>
                            <button className="btn btn-secondary mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={() => {
                                setChangePasswordMode(false);
                                setEditionMode(false);
                            }}>Cancelar</button>
                        </div>
                    </div>
                </>
            )}


        </>
    )
}