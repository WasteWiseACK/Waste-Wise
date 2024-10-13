import FilteredFoodBanksContext from "./filtered-foodbanks-context";
import { useState } from "react";

export default function FilteredFoodBanksContextProvider({ children }) {
    const [filteredFoodBanks, setFilteredFoodBanks] = useState([]);
    const [error, setError] = useState(null);
    const context = { filteredFoodBanks, setFilteredFoodBanks, error, setError }
    return (
        <FilteredFoodBanksContext.Provider value={context}>
            {children}
        </FilteredFoodBanksContext.Provider>
    );
}