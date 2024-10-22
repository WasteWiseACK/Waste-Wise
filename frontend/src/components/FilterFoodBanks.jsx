import { useContext, useState } from "react";
import { fetchHandler } from "../utils/fetchingUtils";
import FilteredFoodBanksContext from "../contexts/filtered-foodbanks-context";
import { MotionConfig, motion } from "framer-motion";

function FilterFoodBanks() {
    const boroughs = ['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'];
    const [selectedBoro, setSelectedBoro] = useState(boroughs[0]);
    const { setFilteredFoodBanks, setError, setCurrentPage } = useContext(FilteredFoodBanksContext);
    const handleSelectedBoro = (event) => {
        setSelectedBoro(event.target.value)
        setCurrentPage(1);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const [data, error] = await fetchHandler(`https://data.cityofnewyork.us/resource/if26-z6xq.json?borough=${selectedBoro}`);
        if (data) {
            console.log(data);
            setFilteredFoodBanks(data)
        } if (error) {
            setError(error);
        }

    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <legend className="body" id="legend_borough">Select Your Borough</legend>
                <MotionConfig
                    transition={{
                        duration: "0.25",
                        ease: "easeInOut"
                    }}
                >
                    <motion.select
                        className="body"
                        name="boroughs"
                        id="boroughs"
                        onChange={handleSelectedBoro}
                        whileHover={{ scale: 1.02, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
                    >
                        {boroughs.map((borough) => (
                            <option value={borough} key={borough}>{borough}</option>
                        ))}
                    </motion.select>
                </MotionConfig>

                <div className="button_filter">
                    <MotionConfig
                        transition={{
                            duration: "0.25",
                            ease: "easeInOut"
                        }}
                    >
                        <motion.button
                            className="body"
                            id="filtering"
                            whileHover={{ scale: 1.05, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
                            whileTap={{ scale: 0.95, rotate: '3deg' }}
                        >
                            Filter by borough
                        </motion.button>
                    </MotionConfig>

                </div>

            </form>
        </div>
    )
}

export default FilterFoodBanks;