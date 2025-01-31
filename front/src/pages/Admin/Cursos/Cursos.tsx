import { useEffect, useState } from "react"
import CursosList from "../../../components/List/CursosList";
import MsgError from "../../../components/MsgError/MsgError";
import SearchBar from "../../../components/SearchBar/SearchBar";

interface Curso {
  titulo: string;
  descricao?: string;
  id: number;
}

export default function Cursos() {

  const [cursos, setCursos] = useState<Curso[]>([]);
  const [filteredCursos, setFilteredCursos] = useState(cursos);
  const [msgError, setMsgError] = useState("");

  const handleSearch = ({ term }: { term: string, type: string }) => {
    // TODO mudar para titulo
    const filtered = cursos.filter((curso) => {
      const matchesName = curso.titulo.toLowerCase().includes(term.toLowerCase());
      return matchesName;
    });
    setFilteredCursos(filtered);
  }

  useEffect(() => {
    const fetchCursos = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/cursos`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        const data = await response.json();
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
      <SearchBar email={false} onSearch={handleSearch} />
      <div className="flex justify-center items-center">
        <div className="grid flex grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-4 lg:w-200 items-center">
          <CursosList dados={filteredCursos} />
        </div>
      </div>
    </>
  );
}