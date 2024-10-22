import { useState, useEffect, useContext } from "react";
import { fetchHandler } from "../utils/fetchingUtils";
import FilteredFoodBanksContext from "../contexts/filtered-foodbanks-context";
import { MotionConfig, motion } from "framer-motion";

function DisplayFoodBanks() {
    const [initialFoodBanks, setInitialFoodBanks] = useState([]);
    const { setError, filteredFoodBanks } = useContext(FilteredFoodBanksContext);
    const fetchInitialBanks = async () => {
        const [data, error] = await fetchHandler('https://data.cityofnewyork.us/resource/if26-z6xq.json');
        console.log(data);
        const banks = [];
        for (let i = 0; i < data.length && banks.length <= 5; i++) {
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
        <div className="display_list">
            <ul>
                {(filteredFoodBanks.length > 0 ? filteredFoodBanks : initialFoodBanks).map((bank) => (
                    <li key={bank.object_id}>
                        <MotionConfig
                            transition={{
                                duration: "0.25",
                                ease: "easeInOut"
                            }}
                        >
                            <motion.div
                                className="bank_container"
                                whileHover={{ scale: 1.02, boxShadow: "2rem 2rem 0px #254336" }}
                            >
                                <h3>{bank.food_scrap_drop_off_site}</h3>
                                <p>Location: {bank.location ? bank.location : bank.food_scrap_drop_off_site}</p>
                                <p>{bank.open_months}</p>
                                <p>Hours of operation: {bank.operation_day_hours}</p>
                                <p>Website: {bank.website}</p>
                            </motion.div>
                        </MotionConfig>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DisplayFoodBanks;