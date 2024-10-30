import DisplayFoodBanks from "../components/DisplayFoodBanks";
import FilterFoodBanks from "../components/FilterFoodBanks";
import BlockInTextFoodBank from "../components/BlockInText";
import Footer from "../components/Footer";
import { ArrowDown } from "lucide-react";
import TEST from "../components/1FramerTest";
import DELAY from "../components/2FramerTest";
import InView from "../components/1FramerInView";

function FoodBank() {
    return (
        <div>


            <main>
                <div className="container">
                    <div className="section_container">
                        <TEST>
                            <section className="about_foodbanks">
                                <BlockInTextFoodBank />
                            </section>
                            <div className="scroll_for_more_FB"><ArrowDown /><ArrowDown /><ArrowDown /></div>
                        </TEST>


                        <section className="title_and_display">

                            <div className="food_bank_title_container">
                                <div className="custom_container_sticky">
                                    <InView>

                                        <h1 className="header1">
                                            FOOD BANKS
                                        </h1>

                                    </InView>
                                    <InView>
                                        <h1 className="header1">
                                            FOOD BANKS
                                        </h1>
                                    </InView>
                                    <InView>
                                        <h1 className="header1">
                                            FOOD BANKS
                                        </h1>
                                    </InView>
                                    <InView>
                                        <h1 className="header1">
                                            FOOD BANKS
                                        </h1>
                                    </InView>
                                    <InView>
                                        <p>waste wise</p>
                                    </InView>
                                </div>

                                <div className="fade-out-gradient"></div>

                            </div>


                            <InView>
                                <div className="food_bank_container">
                                    <FilterFoodBanks />
                                    <DELAY>
                                        <DisplayFoodBanks />
                                    </DELAY>

                                </div>
                            </InView>

                        </section>


                    </div>

                </div>
            </main>
            <Footer />
        </div>


    )
};

export default FoodBank;

