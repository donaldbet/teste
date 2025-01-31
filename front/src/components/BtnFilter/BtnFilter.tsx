import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaFilter } from "react-icons/fa";

interface BtnFilterProps {
    email?: boolean;
    onFilter: (filterType: string) => void;
}

export default function BtnFilter({ email, onFilter }: BtnFilterProps) {
    const [showFilter, setShowFilter] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [filter, setFilter] = useState("");

    const toggleFilterMenu = () => setShowFilter(!showFilter);
    const toggleModal = () => setOpenModal(!openModal);

    const updateFilter = (type: "name" | "email") => {
        let newFilter = "";
        if (filter === `${type}-asc`) {
            newFilter = `${type}-desc`;
        } else if (filter === `${type}-desc`) {
            newFilter = "";
        } else {
            newFilter = `${type}-asc`;
        }

        setFilter(newFilter);
        onFilter(newFilter);

    };

    return (
        <>
            {/* Botão de filtro */}
            <div
                id="btn_filter"
                className="flex justify-center cursor-pointer items-center p-5 bg-white rounded-lg shadow-xl fixed bottom-30 right-10 z-50 hover:bg-[#f0f0f0] transition-all duration-300 ease-in-out"
                onMouseEnter={toggleFilterMenu}
                onMouseLeave={toggleFilterMenu}
                onClick={toggleModal}
            >
                <FaFilter className="text-2xl" color="#00254d" />
                <div className={`${showFilter ? "" : "hidden"}`}>Filtrar</div>
            </div>

            {/* Modal de filtragem */}
            {openModal && (
                <div
                    className="fixed shadow-xl flex flex-col bottom-50 bg-[#FFF] bg-opacity-10 right-10 border-2 border-[#00254d] rounded-2xl p-5"
                    role="dialog"
                    aria-hidden={!openModal}
                >
                    <div className="rounded-2xl p-5 max-w-md w-full text-[#00254d]">
                        Classificar por:
                    </div>

                    {/* Filtro por Nome */}
                    <div
                        className="flex gap-4 rounded-2xl cursor-pointer p-5 max-w-md w-full text-[#00254d]"
                        onClick={() => updateFilter("name")}
                    >
                        Nome
                        {filter.includes("name") && (
                            filter === "name-asc" ? <FaArrowDown className="text-2xl" /> : <FaArrowUp className="text-2xl" />
                        )}
                    </div>

                    {/* Filtro por Email (se permitido) */}
                    {email && (
                        <div
                            className="flex gap-4 rounded-2xl cursor-pointer p-5 max-w-md w-full text-[#00254d]"
                            onClick={() => updateFilter("email")}
                        >
                            Email
                            {filter.includes("email") && (
                                filter === "email-asc" ? <FaArrowDown className="text-2xl" /> : <FaArrowUp className="text-2xl" />
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
