import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchSvg from "../../assets/search.svg";
import styles from "./search-input.module.scss";

interface SearchInputProps {
    setValue: Dispatch<SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ setValue }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setValue(searchTerm);
        }, 500);

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    return (
        <div>
            <div className={styles.input}>
                <input
                    value={searchTerm}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Пошук послуги"
                />
                <img src={SearchSvg} alt="logo" />
            </div>
        </div>
    );
};

export default SearchInput;
