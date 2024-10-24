import TEST from "../components/1FramerTest"
import DELAY from "../components/2FramerTest"
import Boxes from "../components/HomePageBoxes"
import Footer from "../components/Footer"
import { NavLink } from "react-router-dom"


export default function HomePage() {
  return <div>
    <main>
      <div className="container">
        <TEST>
          <div className="our_mission_container">
            <h1 className="header1">OUR MISSION</h1>
          </div>
        </TEST>
        <TEST>
          <div className="underline"></div>
        </TEST>

        <div>
          <section className="container">
            <div className="home_container">
              <div className="prompt_container">
                <Boxes>
                  <p>Waste Wise</p>
                </Boxes>
                <TEST>
                  <p className="mission-statement">
                    Our mission is to bridge the gap between food insecurity and food waste by redistributing food that is still perfectly edible but would otherwise be thrown away. Through our platform, we connect New Yorkers facing hunger with local food banks and meal programs, offering resource locators and nutritional guidance. We also promote sustainability by educating the public and showcasing volunteer opportunities, while providing restaurants and companies a simplified food donation network to ensure surplus food reaches people in need. All in all, we aim to build a more sustainable and fair food system for our city.


                  </p>
                </TEST>

              </div>
              <div className="problem_container">
                <DELAY>
                  <p className="special_home_problem">
                    Food waste in America is a massive player to the issue, contributing 133 billion pounds of food yearly, and amounting to 161 billion dollars that could be saved. All of that food could be used to feed upwards of 42 million Americans. Adding to the problem, according to the UDoA, food waste is the third-largest source of human-related methane emissions, approximating 14.1% in 2017, and is the third-largest emitter of greenhouse gasses overall. Closing in on New York State, it is estimated that about 18% of all waste, which is 3.9 million tons of waste, ends up in landfills; food that can be used to feed food-insecure families is instead being thrown out, wasted.

                  </p>
                  {/* <NavLink id="join_link" className="body" to='/sign-up'> Join the cause</NavLink> */}
                </DELAY>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </div>

}
