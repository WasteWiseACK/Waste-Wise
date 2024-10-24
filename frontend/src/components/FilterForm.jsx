import { useState } from "react";
import MakePost from "./MakeAPost"


const FilterPost = ({ onFilter }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCheckboxChange = (event) => {
    const tagId = event.target.value;
    const isChecked = event.target.checked;

    setSelectedTags(prevTags =>
      isChecked ? [...prevTags, tagId] : prevTags.filter(tag => tag !== tagId)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter(selectedTags); // Pass selected tags to the parent component or make API call here
    console.log(selectedTags)
  };

  const handleClick = (event) => {
    event.preventDefault();
    setSelectedTags([]);
    onFilter([]);
  }

  return (
    <div className="form_container">
      <div className="custom_container_sticky">
        <MakePost />
        <form onSubmit={handleSubmit}>
          <h2 className="header2">Filtering Post</h2>
          <fieldset>
            <legend className="body">Filter by tag</legend>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Food Waste" id="foodWaste" value="1" onChange={handleCheckboxChange} checked={selectedTags.includes("1")} />
              </div>
              <div id="label">
                <label htmlFor="foodWaste">Food Waste</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Sustainability" id="" value="2" onChange={handleCheckboxChange} checked={selectedTags.includes("2")} />
              </div>
              <div id="label">
                <label htmlFor="sustainability">Sustainability</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Community" id="" value="3" onChange={handleCheckboxChange} checked={selectedTags.includes("3")} />
              </div>
              <div id="label">
                <label htmlFor="community">Community</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Recycling" id="" value="4" onChange={handleCheckboxChange} checked={selectedTags.includes("4")} />
              </div>
              <div id="label">
                <label htmlFor="recycling">Recycling</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Charity" id="" value="5" onChange={handleCheckboxChange} checked={selectedTags.includes("5")} />
              </div>
              <div id="label">
                <label htmlFor="charity">Charity</label>
              </div>
            </div>
            <div className="row">
              <div id="input">
                <input type="checkbox" name="Questions" id="" value="6" onChange={handleCheckboxChange} checked={selectedTags.includes("6")} />
              </div>
              <div id="label">
                <label htmlFor="questions">Questions</label>
              </div>
            </div>
          </fieldset>
          <div className="button_filter">
            <button type="submit">Filter</button>
            <button onClick={handleClick}> Reset</button>
          </div>
        </form>
      </div >
    </div >
  )
}

export default FilterPost