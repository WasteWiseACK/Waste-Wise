import DisplayFoodBanks from "../components/DisplayFoodBanks";
import FilterFoodBanks from "../components/FilterFoodBanks";
import Footer from "../components/Footer";

function FoodBank() {
    return (
        <div className="container">
            <>
                <main>
                    <div className="food_bank_container">
                        <FilterFoodBanks />
                        <DisplayFoodBanks />
                    </div>

                </main>
            </>
        </div>

    )
};

export default FoodBank;

