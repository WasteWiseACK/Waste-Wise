import { useState, useEffect, useContext } from "react";
import { fetchHandler } from "../utils/fetchingUtils";
import FilteredFoodBanksContext from "../contexts/filtered-foodbanks-context";

function DisplayFoodBanks() {
    const [initialFoodBanks, setInitialFoodBanks] = useState([]);
    const { setError, filteredFoodBanks } = useContext(FilteredFoodBanksContext);
    const fetchInitialBanks = async () => {
        const [data, error] = await fetchHandler('https://data.cityofnewyork.us/resource/if26-z6xq.json');
        console.log(data);
        const banks = [];
        for (let i = 0; i < data.length && banks.length <= 25; i++) {
            let bank = data[Math.floor(Math.random() * (data.length))];
            banks.push(bank);
        }
        if (data) {
            setInitialFoodBanks(banks)
            console.log(initialFoodBanks)
        } if (error) {
            setError(error)
        }
    }
    useEffect(() => {
        fetchInitialBanks();
    }, [])
    console.log(filteredFoodBanks)
    return (
        <div>
            <ul>
                {(filteredFoodBanks.length > 0 ? filteredFoodBanks : initialFoodBanks).map((bank) => (
                    <li key={bank.ct2010}>
                        <div class="bank-container">
                            <h3>{bank.food_scrap_drop_off_site}</h3>
                            <p>{bank.location}</p>
                            <p>{bank.open_months}</p>
                            <p>{bank.operation_day_hours}</p>
                            <p>{bank.website}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DisplayFoodBanks;