import TEST from "../components/1FramerTest"
import DELAY from "../components/2FramerTest"
import Boxes from "../components/HomePageBoxes"
import Footer from "../components/Footer"
import { NavLink } from "react-router-dom"
import { MotionConfig, motion } from "framer-motion"


export default function HomePage() {
  return <div>
    <main>
      <div className="container">
        <div className="mission_underline">
          <TEST>
            <div className="our_mission_container">
              <h1 className="header1">OUR MISSION</h1>
              <h1 className="header2">WASTE WISE</h1>
            </div>
          </TEST>
          <TEST>
            <div className="underline"></div>
          </TEST>
        </div>


        <div>
          <section className="container">
            <div className="home_container" style={{ marginBottom: "4rem" }}>
              <div className="prompt_container">
                <Boxes />
                <TEST>
                  <p className="header2">
                    <strong>BRIDGE</strong>   the gap between food insecurity and food waste by redirecting surplus food to New Yorkers in need. Through our platform, we connect people with local food banks, offer nutritional guidance, and provide a simplified donation network for businesses, fostering a more sustainable and equitable food system.

                  </p>
                </TEST>

              </div>
              <div className="problem_container">
                <DELAY>
                  <p className="special_home_problem" style={{ fontSize: "1.35rem" }}>


                    America wastes 133 billion pounds of food annually, costing $161 billion and enough to feed 42 million people. Food waste is also the third-largest source of methane emissions, contributing 14.1% in 2017, and a major greenhouse gas emitter. In New York State, 18% of waste (3.9 million tons) goes to landfills, with much of it still edible and capable of feeding food-insecure families.

                  </p>
                  <MotionConfig
                    transition={{
                      duration: "0.25",
                      ease: "easeInOut"
                    }}
                  >
                    <motion.button
                      className="home_button"
                      whileHover={{ scale: 1.05, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
                      whileTap={{ scale: 0.95, rotate: '3deg' }}
                    >
                      <NavLink id="join_link" className="body" to='/sign-up'> Join the cause</NavLink>
                    </motion.button>
                  </MotionConfig>

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
