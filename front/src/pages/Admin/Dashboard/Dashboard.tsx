import { useEffect } from "react";
import Card from "../../../components/Card/Card";

function Dashboard({ }) {

    useEffect(() => {
        
    }, [])

    return (
        <>
            <div className="flex justify-center items-center p-5">
                <h1 className="text-4xl font-bold text-[#374151]">Dashboard</h1>
            </div>
            <div className="flex flex-col items-center sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-5">
                <Card color="bg-[#61eb34]" title="Alunos" info="680" text="Número de alunos"/> {/* Alunos */}
                <Card color="bg-[#b53636]" title="Professores" titleColor="text-[#FFF]" textColor="text-[#FFF]" info="680" text="Número de professores" /> {/* Professores */}
                <Card color="bg-[#ffee00]" title="Cursos" info="680" text="Número de cursos" /> {/* Cursos */}
                <Card color="bg-[#009dd1]" title="Matrículas" info="680" text="Número de matrículas" titleColor="text-[#FFF]" textColor="text-[#FFF]" />{/* Matrículas */}
                <Card color="bg-[#ae00d1]" title="Disciplinas" info="680" text="Número de disciplinas" titleColor="text-[#FFF]" textColor="text-[#FFF]" /> {/* Disciplinas */}
            </div>
        </>
    );
}

export default Dashboard;