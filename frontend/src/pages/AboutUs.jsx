import Kevin from "../components/Kevin"
import Cindy from "../components/Cindy"
import America from "../components/America"
import TEST from "../components/1FramerTest"

const AboutUs = () => {
  return (
    <div className='container'>
      <div className="title_description_about">
        <div className="about_title">
          <TEST>
            <h1 className="title">Welcome to WasteWise!</h1>
          </TEST>

        </div>
        <div className="about_description">
          <TEST>
            <h3 className="header2">Our project is driven by a shared vision to build seamless and user-friendly applications that address real-world challenges.
              Get to know the team of passionate developers, designers, and problem solvers behind it all!
            </h3>
          </TEST>
        </div>
      </div>

      <div className="the_team">
        <America></America>
        <Cindy></Cindy>
        <Kevin></Kevin>
      </div>
    </div>
  )
}

export default AboutUs