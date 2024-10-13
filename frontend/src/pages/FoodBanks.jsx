import DisplayFoodBanks from "../components/DisplayFoodBanks";
import FilterFoodBanks from "../components/FilterFoodBanks";
import SiteHeadingAndNav from "../components/SiteHeadingAndNav";

function FoodBank() {
    return (
        <>
            <SiteHeadingAndNav />
            <div>
                <FilterFoodBanks />
                <DisplayFoodBanks />
            </div>
        </>
    )
};

export default FoodBank;

