import { useEffect, useState } from "react"
import CursosList from "../../../components/List/CursosList";
import MsgError from "../../../components/MsgError/MsgError";

interface Curso {
  titulo: string;
  descricao?: string;
  id: number;
}

export default function Cursos() {

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [filteredCursos, setFilteredCursos] = useState(cursos);
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos`);
      if (!response.ok) {
        console.error("Erro ao buscar cursos");
        const data = await response.json();
        console.log(data.message);
        setMsgError(data.message);
        return;
      }
      const data = await response.json();
      setCursos(data.data);
      setFilteredCursos(data.data);
    };
    fetchCursos();
  }, []);

  return (
    <>
      {msgError && <MsgError msg={msgError} />}
      <div className="flex justify-center items-center p-5">
        <h1 className="text-4xl font-bold text-[#374151]">Cursos</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 p-2 gap-4">
        <CursosList dados={filteredCursos} />
      </div>
    </>
  );
}