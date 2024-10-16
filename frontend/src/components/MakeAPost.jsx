import { useState } from "react"
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils"


const baseUrl = '/api/posts';

const MakePost = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [createBody, setCreateBody] = useState("")
  const [createTitle, setCreateTitle] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("post created:", createBody, createTitle, selectedTags)


    const postData = {
      title: createTitle,
      body: createBody,
    }

    const [post, error] = await fetchHandler(baseUrl, getPostOptions(postData));
    return post;


    // try {
    //   const response = await fetch("/api/posts", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(postData),
    //   });

    // if (response.ok) {
    //   const data = await response.json();
    //   console.log("Post created successfully:", data);

    //   setCreateTitle("");
    //   setCreateBody("");

    // } else {
    //   console.error("Failed to create post");
    // }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  }


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
        <form className="post" action="" onSubmit={handleSubmit}>
          <legend className="body">Create Your Post</legend>
          <div id="input">
            <input type="text" placeholder="Title..." value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} />
          </div>
          <div id="input">
            <input type="text" placeholder="Type here..." value={createBody} onChange={(e) => setCreateBody(e.target.value)} />
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
            <button type="submit">Post</button>
          </div>

        </form>
      </div>)}
    </section>
  )
}



export default MakePost