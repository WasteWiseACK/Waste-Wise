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
                  <p className="header1">
                    133 billion lbs of food yearly
                    14.1% of methane emissions

                  </p>
                </TEST>

              </div>
              <div className="problem_container">
                <DELAY>
                  <p className="special_home_problem">something!!!</p>
                  <NavLink id="join_link" className="body" to='/sign-up'> Join the cause</NavLink>
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
