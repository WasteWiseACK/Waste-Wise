import FilterPost from "../components/FilterForm"
import ForumPost from "../components/Forum"
import Post from "../components/Post"


const Forum = () => {


  return (
    <section className="container">
      <div className="forum_container">
        <FilterPost />
        <Post />
        <ForumPost />
      </div>
    </section>
  )
}

export default Forum;