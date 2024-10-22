import LinkPreview from "../components/LinkPreview"

const Solutions = () => {
  return (
    <div className="container">
      <main className="solution_main">
        <div className="solution_container">
          <div className="solution_title">
            <h1 className="title" id="solutions">
              SO-
              LUT-
              IONS
            </h1>
          </div>

          <p className="body">
            <span className="header2">Composting</span> converts food scraps, yard waste, and other biodegradable materials into nutrient-rich compost that enriches soil. It reduces landfill waste and greenhouse gas emissions, and can be implemented in communities, workplaces, and schools.
            The resulting compost supports sustainable agriculture and healthier plants.
            <span id="solution_underline" className="underline" />
            <span className="header2">Campaigns</span> education campaigns are crucial for changing behaviors around food waste. These initiatives, including seminars, social media campaigns, and educational materials, teach meal planning, food storage, and creative leftover use.
            By encouraging recycling, understanding expiration dates, and mindful purchasing, these programs promote sustainable consumption and help reduce food waste in communities.
          </p>
          <div className="solution_items">
            <p className="body">
              <span className="header2">Food recovery</span> initiatives prevent excess food from grocery stores, restaurants, and farms from going to landfills by redirecting it to food banks, shelters, and nonprofits.
              This approach addresses hunger, reduces food waste, and requires coordination, planning, and legal protections for donors, offering significant social and environmental benefits.
            </p>
          </div>
        </div>


        <div className="opportunities_container">
          <div className="heading_oppor">
            <h1 className="header1">OPPORTUNITIES</h1>
            <caption className="body">ways to join the cause</caption>
          </div>



          <div className="preview_links_container">
            <LinkPreview>
              https://www.volunteermatch.org/
            </LinkPreview>
            <LinkPreview>
              https://www.boulderfoodrescue.org/food-rescue-alliance/
            </LinkPreview>
          </div>
        </div>


        <h2 className="header2">More Info.</h2>


        <LinkPreview>
          https://www.foodwastealliance.org/
        </LinkPreview>
        <LinkPreview>
          https://www.feedingamerica.org/
        </LinkPreview>
        <LinkPreview>
          https://www.lovefoodhatewaste.com/
        </LinkPreview>
        <LinkPreview>
          https://www.epa.gov/sustainable-management-food/food-too-good-waste-implementation-guide-and-toolkit
        </LinkPreview>

      </main>



    </div>
  )
}

export default Solutions


