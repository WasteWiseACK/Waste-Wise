import DisplayFoodBanks from "../components/DisplayFoodBanks";
import FilterFoodBanks from "../components/FilterFoodBanks";
import Footer from "../components/Footer";
import TEST from "../components/1FramerTest";
import DELAY from "../components/2FramerTest";

function FoodBank() {
    return (
        <div>


            <main>
                <div className="container">
                    <section className="title_and_display">
                        <div className="food_bank_title_container">
                            <div className="custom_container_sticky">
                                <TEST>
                                    <h1 className="header2">
                                        FOOD BANKS
                                    </h1>
                                </TEST>
                                <TEST>
                                    <h1 className="header2">
                                        FOOD BANKS
                                    </h1>
                                </TEST>
                                <TEST>
                                    <h1 className="header2">
                                        FOOD BANKS
                                    </h1>
                                </TEST>
                                <TEST>
                                    <h1 className="header2">
                                        FOOD BANKS
                                    </h1>
                                </TEST>
                                <TEST>
                                    <h1 className="header2">
                                        FOOD BANKS
                                    </h1>
                                </TEST>
                                <TEST>
                                    <p>waste wise</p>
                                </TEST>
                            </div>
                            <div className="fade-out-gradient"></div>

                        </div>
                        <div className="food_bank_container">
                            <FilterFoodBanks />
                            <DELAY>
                                <DisplayFoodBanks />
                            </DELAY>

                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>


    )
};

export default FoodBank;

