import TEST from "../components/1FramerTest"
import DELAY from "../components/2FramerTest"
import { NavLink } from "react-router-dom"


export default function HomePage() {
  return <div className="container">
    <TEST>
      <h1 className="header1">OUR MISSION</h1>
    </TEST>
    <div>
      <section className="container">
        <div className="home_container">
          <div className="prompt_container">
            <TEST>
              <p className="header1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis fugiat deleniti culpa</p>
            </TEST>
          </div>
          <div className="problem_container">
            <DELAY>
              <p className="special_home_problem">something!!!</p>
              <NavLink className="body" to='/sign-up'> Join the cause</NavLink>
            </DELAY>
          </div>
        </div>
      </section>
    </div>

  </div>
}
