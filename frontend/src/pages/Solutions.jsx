import LinkPreview from "../components/LinkPreview"
import { ArrowDown } from "lucide-react"
import SliderBox from "../components/1FramerSliderBoxes"
import FlexibleBoxes from "../components/1FramerSolutionBoxes"
import TEST from "../components/1FramerTest"
import InView from "../components/1FramerInView"
import DELAY from "../components/2FramerTest"

const Solutions = () => {
  return (
    <div className="container">

      <main className="solution_main">

        <FlexibleBoxes x={-300} y={100} x2={-1000} y2={100} />
        <FlexibleBoxes x={-900} y={500} x2={-400} y2={500} />

        <div className="solution_container">


          <div className="solution_title">
            <TEST>
              <h1 className="title" id="solutions">
                SO-
                LU-
                TIONS
              </h1>
            </TEST>


          </div>


          <div className="solution_body">
            <DELAY>
              <p className="body">
                <span className="header2">Composting</span> converts food scraps, yard waste, and other biodegradable materials into nutrient-rich compost that enriches soil. It reduces landfill waste and greenhouse gas emissions, and can be implemented in communities, workplaces, and schools.
                The resulting compost supports sustainable agriculture and healthier plants.
                <span id="solution_underline" className="underline" />
                <span className="header2">Campaigns</span> education campaigns are crucial for changing behaviors around food waste. These initiatives, including seminars, social media campaigns, and educational materials, teach meal planning, food storage, and creative leftover use.
                By encouraging recycling, understanding expiration dates, and mindful purchasing, these programs promote sustainable consumption and help reduce food waste in communities.
              </p>
            </DELAY>

          </div>

          <div className="solution_items">
            <DELAY>
              <p className="body">
                <span className="header2">Food recovery</span> initiatives prevent excess food from grocery stores, restaurants, and farms from going to landfills by redirecting it to food banks, shelters, and nonprofits.
                This approach addresses hunger, reduces food waste, and requires coordination, planning, and legal protections for donors, offering significant social and environmental benefits.
              </p>
            </DELAY>

          </div>
        </div>

        <div className="scroll_for_more"><ArrowDown /><ArrowDown /><ArrowDown /></div>


        <div className="opportunities_container">
          <div className="preview_links_container">
            <InView>
              <LinkPreview>
                https://www.volunteermatch.org/
              </LinkPreview>
            </InView>
            <InView>
              <LinkPreview>
                https://www.boulderfoodrescue.org/food-rescue-alliance/
              </LinkPreview>
            </InView>

          </div>

          <div className="heading_oppor">
            <InView>
              <h1 className="header1">OPPORTUNITIES</h1>
            </InView>
            <InView>
              <p className="body" style={{ margin: "0.5rem 0 0 1rem", fontStyle: "italic" }}>Take action now</p>
            </InView>
          </div>
        </div>

        <div className="moreInfo">
          <h2 className="header2" style={{ margin: "0 0 0 0" }}>More Info.</h2>
          <p className="body" style={{ margin: "0.5rem 1rem 2rem 0", fontStyle: "italic" }}>For a more in-depth research</p>

          <InView>
            <LinkPreview>
              https://www.foodwastealliance.org/
            </LinkPreview>
          </InView>

          <InView>
            <LinkPreview>
              https://www.feedingamerica.org/
            </LinkPreview>
          </InView>

          <InView>
            <LinkPreview>
              https://www.lovefoodhatewaste.com/
            </LinkPreview>
          </InView>

          <InView>
            <LinkPreview>
              https://www.epa.gov/sustainable-management-food/food-too-good-waste-implementation-guide-and-toolkit
            </LinkPreview>
          </InView>

        </div>


      </main>



    </div>
  )
}

export default Solutions


