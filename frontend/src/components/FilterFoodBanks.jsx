import { useContext, useState } from "react";
import { fetchHandler } from "../utils/fetchingUtils";
import FilteredFoodBanksContext from "../contexts/filtered-foodbanks-context";
function FilterFoodBanks() {
    const boroughs = ['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'];
    const [selectedBoro, setSelectedBoro] = useState('');
    const { setFilteredFoodBanks, setError } = useContext(FilteredFoodBanksContext);
    const handleSelectedBoro = (event) => {
        setSelectedBoro(event.target.value)
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const [data, error] = await fetchHandler(`https://data.cityofnewyork.us/resource/if26-z6xq.json?borough=${selectedBoro}`);
        if (data) {
            setFilteredFoodBanks(data)
        } if (error) {
            setError(error);
        }

    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="boroughs"></label>
                <select name="boroughs" id="boroughs" onChange={handleSelectedBoro}>
                    {boroughs.map((borough) => {
                        <option value={borough}>{borough}</option>
                    })}
                </select>
                <button>Filter by borough</button>
            </form>
        </div>
    )
}

export default FilterFoodBanks;