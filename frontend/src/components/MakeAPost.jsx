import { useState } from "react"


const MakePost = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])


  const handleSelectTags = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedTags(selectedOptions);
  }

  const toggleVisible = () => {
    setIsVisible(!isVisible)
  }

  return (
    <section>
      <div className="button_post">
        <button onClick={toggleVisible}>Make a post!</button>
      </div>
      {isVisible && (<div className="form_popup">
        <form className="post" action="">
          <legend className="body">Create Your Post</legend>
          <div id="input">
            <input type="text" placeholder="Type here..." />
          </div>
          <label className="body">Tags</label>
          <div className="tag_selections">
            <select name="tags" id="" multiple={true} value={selectedTags} onChange={handleSelectTags}>
              <option value="Food Waste">Food Waste</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Community">Community</option>
              <option value="Recycling">Recycling</option>
              <option value="Charity">Charity</option>
              <option value="Questions">Questions</option>
            </select>
          </div>

          <div>
            <button>Post</button>
          </div>

        </form>
      </div>)}
    </section>

  )
}



export default MakePost