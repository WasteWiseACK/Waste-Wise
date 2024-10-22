import Kevin from "../components/Kevin"
import Cindy from "../components/Cindy"
import America from "../components/America"

const AboutUs = () => {
  return (
    <div className='container'>
      <div className="title_description_about">
        <div className="about_title">
          <h1 className="title">Welcome to WasteWise!</h1>
        </div>
        <div className="about_description">
          <h3 className="header2">Our project is driven by a shared vision to build seamless and user-friendly applications that address real-world challenges.
            Get to know the team of passionate developers, designers, and problem solvers behind it all!
          </h3>
        </div>
      </div>


      <div>
        <America></America>
        <Cindy></Cindy>
        <Kevin></Kevin>
      </div>
    </div>
  )
}

export default AboutUs