import DisplayFoodBanks from "../components/DisplayFoodBanks";
import FilterFoodBanks from "../components/FilterFoodBanks";

function FoodBank() {
    return (
        <>
            <div>
                <FilterFoodBanks />
                <DisplayFoodBanks />
            </div>
        </>
    )
};

export default FoodBank;

