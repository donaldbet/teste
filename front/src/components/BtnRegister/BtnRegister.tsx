import { useEffect, useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { SiHtmlacademy } from "react-icons/si";
import { NavLink } from "react-router-dom";


export default function BtnRegister({ str, strC }: { str?: string, strC?: string }) {

    const [icon, setIcon] = useState(<></>);
    useEffect(() => {
        if (str === "alunos" || str === "professores") {
            setIcon(<IoIosPersonAdd className="text-2xl" />);
        } else {
            setIcon(<SiHtmlacademy />);
        }
    }, [str]);

    useEffect(() => {
        if (strC === "Matricular Aluno") {
            setIcon(<IoIosPersonAdd className="text-2xl" />);
            str = "matriculas";
        } else {
            setIcon(<SiHtmlacademy />);
        }
    }, []);

    return (
        <NavLink id="btn_register" to={`/admin/${str}/cadastrar`} className="flex justify-center text-2xl items-center p-5 lg:p-2 gap-2 bg-[#2ab54c] text-white rounded-md sm:w-15 lg:w-70 h-15 fixed bottom-5 right-10 shadow-xl hover:bg-[#1d522a] transition-all duration-300 ease-in-out">
            {icon}
            <div className="hidden lg:flex md:flex">
                {strC ? strC : `Cadastrar ${str}`}
            </div>
        </NavLink>
    )

}