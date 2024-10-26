import { useState, useEffect, useContext } from "react";
import { fetchHandler } from "../utils/fetchingUtils";
import FilteredFoodBanksContext from "../contexts/filtered-foodbanks-context";
import { MotionConfig, motion } from "framer-motion";

function DisplayFoodBanks() {
    const [initialFoodBanks, setInitialFoodBanks] = useState([]);
    const { setError, filteredFoodBanks, currentPage, setCurrentPage } = useContext(FilteredFoodBanksContext);
    const itemLimit = 5;
    const fetchInitialBanks = async () => {
        const [data, error] = await fetchHandler('https://data.cityofnewyork.us/resource/if26-z6xq.json');
        console.log(data);
        const banks = [];
        for (let i = 0; i < data.length && banks.length <= 4; i++) {
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
    const foodBanksToDisplay = filteredFoodBanks.length > 0 ? filteredFoodBanks : initialFoodBanks;
    const totalPages = Math.ceil(foodBanksToDisplay.length / itemLimit);
    const startIndex = (currentPage - 1) * itemLimit;
    const endIndex = startIndex + itemLimit;
    const currentBanks = foodBanksToDisplay.slice(startIndex, endIndex);

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    useEffect(() => {
        fetchInitialBanks();
    }, [])
    console.log(filteredFoodBanks)
    return (
        <div className="display_list">
            <ul>
                {(currentBanks).map((bank) => {
                    const websiteUrl = bank.website && (bank.website.startsWith('http://') || bank.website.startsWith('https://'))
                        ? bank.website
                        : bank.website
                            ? `http://${bank.website}` // Prepend http if necessary
                            : null; // Set to null if no website

                    return (
                        <li key={bank.object_id} className="foodbank_list">
                            {websiteUrl ? (
                                <a href={websiteUrl} target='_blank'>
                                    <MotionConfig
                                        transition={{
                                            duration: "0.25",
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <motion.div
                                            className="bank_container"
                                            whileHover={{ scale: 1.02, boxShadow: "2rem 2rem 0px #254336", color: "#6b8a7a" }}
                                        >
                                            <h3 className="header3">{bank.food_scrap_drop_off_site}</h3>
                                            <p>Location: {bank.location ? bank.location : bank.food_scrap_drop_off_site}</p>
                                            <p>{bank.open_months}</p>
                                            <p>Hours of operation: {bank.operation_day_hours}</p>
                                            <p> {bank.website ? `Website: ${bank.website}` : 'No website available'}</p>
                                        </motion.div>
                                    </MotionConfig>
                                </a>
                            ) : (
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
                                        <p>No website available</p> {/* Alternative message */}
                                    </motion.div>
                                </MotionConfig>
                            )}
                        </li>
                    )
                })}
            </ul>
            <div className="pagination">
                <MotionConfig
                    transition={{
                        duration: "0.25",
                        ease: "easeInOut"
                    }}
                >
                    <motion.button
                        className="body"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        whileHover={{ scale: 1.05, backgroundColor: "#254336", color: "#f5f0d4", cursor: "pointer" }}
                        whileTap={{ scale: 0.95, rotate: '3deg' }}
                        id="page_change"
                    >
                        Previous
                    </motion.button>
                </MotionConfig>

                <span className="body">Page {currentPage} of {totalPages}</span>
                <MotionConfig
                    transition={{
                        duration: "0.25",
                        ease: "easeInOut"
                    }}
                >
                    <motion.button
                        className="body"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        whileHover={{ scale: 1.05, backgroundColor: "#254336", color: "#f5f0d4", cursor: "pointer" }}
                        whileTap={{ scale: 0.95, rotate: '3deg' }}
                        id="page_change"
                    >
                        Next
                    </motion.button>
                </MotionConfig>

            </div>
        </div >
    )
}

export default DisplayFoodBanks;