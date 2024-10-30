import C02 from "../components/C02Map"
import FoodInsecurity from "../components/FoodInsecurityMap"

const Impact = () => {
  return (
    <div className='Maps'>
      <h1 className="header1 title_impact">IMPACT</h1>
      <FoodInsecurity />
      <C02 />
      <p className="Description body_post">Food waste and CO2 emissions are closely related in a number of ways.
        Methane, one of the most potent greenhouse gasses, is released when food waste decomposes anaerobically in landfills.
        Furthermore, when food is thrown away, the resources utilized to produce it—such as energy, land, and water—are wasted, which causes needless CO2 emissions from transportation and agriculture.
        Additionally, by decreasing carbon sequestration, the conversion of forests into agricultural land for excessive food production exacerbates climate change.
        Overall, as food waste minimizes the environmental effect of the food supply chain and reduces resource inefficiencies, it is essential for reducing CO2 emissions and building more sustainable food systems.</p>
    </div>
  )
}

export default Impact