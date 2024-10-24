import { useState } from "react";
import FilterPost from "../components/FilterForm"
import ForumPost from "../components/Forum"
// import Post from "../components/Post"


const Forum = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const handleFilter = (tags) => {
    setSelectedTags(tags); // Update the selected tags
  };

  return (
    <section className="container">
      <div className="forum_container">
        <FilterPost onFilter={handleFilter} />
        {/* <Post /> */}
        <ForumPost selectedTags={selectedTags} />
      </div>
    </section>
  )
}

export default Forum;