import FilterPost from "../components/FilterForm"
import Post from "../components/Post"


const Forum = () => {


  return (
    <section className="container">
      <div className="forum_container">
        <FilterPost />
        <Post />
      </div>
    </section>
  )
}

export default Forum