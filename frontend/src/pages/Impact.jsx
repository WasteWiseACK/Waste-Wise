import C02 from "../components/C02Map"
import FoodInsecurity from "../components/FoodInsecurityMap"
import DELAY from "../components/2FramerTest"
import TEST from "../components/1FramerTest"
import SliderBox from "../components/1FramerSliderBoxes"
import Footer from "../components/Footer"

const Impact = () => {
  return (
    <div>
      <main>
        <div className="container">
          <div className='Maps'>
            <div className="description_impact">
              <div className="custom_container_sticky">
                <SliderBox>
                  <h1 className="title title_impact">IMPACT</h1>
                </SliderBox>
                <TEST>
                  <p className="Description body_post">Food waste and CO2 emissions are closely related in a number of ways.
                    Methane, one of the most potent greenhouse gasses, is released when food waste decomposes anaerobically in landfills.
                    Furthermore, when food is thrown away, the resources utilized to produce it—such as energy, land, and water—are wasted, which causes needless CO2 emissions from transportation and agriculture.
                  </p>
                  <p className="body_post">Additionally, by decreasing carbon sequestration, the conversion of forests into agricultural land for excessive food production exacerbates climate change.
                    Overall, as food waste minimizes the environmental effect of the food supply chain and reduces resource inefficiencies, it is essential for reducing CO2 emissions and building more sustainable food systems.
                  </p>
                </TEST>
                <TEST>
                  <div className="impact_link">
                    <p>If you would like to learn more, here are a few sites: </p>
                    <a href="https://news.climate.columbia.edu/2021/01/15/global-food-systems-challenges/">State of the Planet - Columbia University</a>
                  </div>
                </TEST>
              </div>



            </div>
            <div className="map_container">
              <DELAY>
                <FoodInsecurity />
              </DELAY>
              <DELAY>
                <C02 />

              </DELAY>

            </div>
            {/* <div className="impact_title_container">

        </div> */}

          </div>
        </div>
      </main>

      <Footer />
    </div>

  )
}

export default Impact