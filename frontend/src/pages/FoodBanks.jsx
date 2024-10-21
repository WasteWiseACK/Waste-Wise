import DisplayFoodBanks from "../components/DisplayFoodBanks";
import FilterFoodBanks from "../components/FilterFoodBanks";
import Footer from "../components/Footer";

function FoodBank() {
    return (
        <div>


            <main>
                <div className="container">
                    <section className="title_and_display">
                        <div className="food_bank_title_container">
                            <h1 className="header2">
                                FOOD BANKS
                            </h1>
                            <h1 className="header2">
                                FOOD BANKS
                            </h1>
                            <h1 className="header2">
                                FOOD BANKS
                            </h1>
                            <h1 className="header2">
                                FOOD BANKS
                            </h1>
                            <h1 className="header2">
                                FOOD BANKS
                            </h1>
                            {/* <span id="solution_underline" className="underline" /> */}
                            <p>waste wise</p>
                        </div>
                        <div className="food_bank_container">
                            <FilterFoodBanks />
                            <DisplayFoodBanks />
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>


    )
};

export default FoodBank;

