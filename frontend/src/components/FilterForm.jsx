import MakePost from "./MakeAPost"


const FilterPost = () => {
  return (
    <div className="form_container">
      <div className="custom_container_sticky">
        <MakePost />
        <form action="">
          <h2 className="header2">Filtering Post</h2>
          <fieldset>
            <legend className="body">Filter by tag</legend>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Food Waste" id="foodWaste" value="foodWaste" />
              </div>
              <div id="label">
                <label htmlFor="foodWaste">Food Waste</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Sustainability" id="" value="Sustainability" />
              </div>
              <div id="label">
                <label htmlFor="sustainability">Sustainability</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Community" id="" value="community" />
              </div>
              <div id="label">
                <label htmlFor="community">Community</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Recycling" id="" value="recycling" />
              </div>
              <div id="label">
                <label htmlFor="recycling">Recycling</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Charity" id="" value="charity" />
              </div>
              <div id="label">
                <label htmlFor="charity">Charity</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Questions" id="" value="questions" />
              </div>
              <div id="label">
                <label htmlFor="questions">Questions</label>
              </div>
            </div>
          </fieldset>
          <div className="button_filter">
            <button type="submit">Filter</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FilterPost