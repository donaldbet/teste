import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ email, onSearch }: { email?: boolean, onSearch: ({ term, type }: { term: string, type: string }) => void }) {

    const [placeholder, setPlaceholder] = useState("Pesquise pelo nome");
    const [searchOption, setSearchOption] = useState("name");

    const handlePlaceHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "name") {
            setPlaceholder("Pesquise pelo nome");
        } else {
            setPlaceholder("Pesquise pelo email");
        }
    }

    const handleSearchOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchInput = document.getElementById("search") as HTMLInputElement;
        if (searchInput) {
            searchInput.value = "";
        }
        setSearchOption(e.target.value);
        handlePlaceHolder(e);
        onSearch({ term: "", type: e.target.value });
    }


    return (
        <div className="flex flex-col justify-center items-center p-5">
            <div className="flex lg:w-300 justify-center items-center bg-white rounded-lg shadow-xl p-3 focus-within:ring-2 focus-within:ring-[#00254d]">
                <input
                    id="search"
                    name="search"
                    type="text"
                    className="w-full pl-4 text-sm outline-none"
                    placeholder={placeholder}
                    onChange={(e) => onSearch({ term: e.target.value, type: searchOption })}
                />
                <button className="flex items-center justify-center bg-[#00254d] h-8 w-8 rounded-lg">
                    <FaSearch color="#FFF" />
                </button>
            </div>
            {email && (
                <div className="flex items-center mt-8">
                    <input type="radio" name="searchOption" value="name" id="name" defaultChecked onChange={handleSearchOption} />
                    <label htmlFor="name" className="ml-2">Nome</label>
                    <input type="radio" name="searchOption" value="email" id="email" className="ml-4" onChange={handleSearchOption} />
                    <label htmlFor="email" className="ml-2">Email</label>
                </div>
            )}
        </div>
    )
}