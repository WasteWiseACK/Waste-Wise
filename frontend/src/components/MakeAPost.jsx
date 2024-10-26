import { useState } from "react";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";
import { ToastContainer, toast } from "react-toastify";
import { MotionConfig, motion } from "framer-motion";
import { X } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "/api/posts";

const options = [
  { value: "1", label: "Food Waste" },
  { value: "2", label: "Sustainability" },
  { value: "3", label: "Community" },
  { value: "4", label: "Recycling" },
  { value: "5", label: "Charity" },
  { value: "6", label: "Questions" }
];

const MakePost = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [createBody, setCreateBody] = useState("");
  const [createTitle, setCreateTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedTags.length === 0) {
      toast.error('Please select at least one tag.')
      return
    }

    const postData = {
      title: createTitle,
      body: createBody,
    };

    const [post, error] = await fetchHandler(baseUrl, getPostOptions(postData));

    if (post) {
      const tagData = { tags: selectedTags };
      const tagUrl = `/api/posts/${post.id}/tag`;
      const [tagResponse, tagError] = await fetchHandler(tagUrl, getPostOptions(tagData));

      if (tagError) {
        console.error("Error adding tags to post:", tagError);
      } else {
        toast.success("Post created!")
        // If the tags are successfully added, close the form
        toggleVisible();
      }
    }

    if (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleCheckBox = (value) => {
    setSelectedTags((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((option) => option != value)
        : [...prevSelected, value]
    )
  };

  const toggleVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section>
      <div className="button_post">
        <MotionConfig
          transition={{
            duration: "0.25",
            ease: "easeInOut"
          }}
        >
          <motion.button
            className="body"
            id="reply_button"
            onClick={toggleVisible}
            whileHover={{ scale: 1.05, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
            whileTap={{ scale: 0.95, rotate: '3deg' }}
          >
            Make a post!
          </motion.button>
        </MotionConfig>

      </div>

      {isVisible && (
        <div className="form_popup">
          <button id="close_button" onClick={toggleVisible}>
            <X />
          </button>
          <form className="creating_post_popup" onSubmit={handleSubmit}>

            <div className="input_container">
              <legend className="body" id="legend_popup_createPost">Create Your Post</legend>
              <div id="input">
                <textarea
                  id="text_area_title_popup"
                  className="text_area"
                  placeholder="Title..."
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  required
                />
              </div>
              <div id="input">
                <textarea
                  className="text_area"
                  placeholder="Type here..."
                  value={createBody}
                  onChange={(e) => setCreateBody(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="tag_container_popup">
              <label className="body">Tags</label>
              <div className="tag_selections">
                {options.map((option) => (
                  <label key={option.value} className="body" id="tag_label">
                    <input
                      className="input_tags"
                      type="checkbox"
                      value={option.value}
                      checked={selectedTags.includes(option.value)}
                      onChange={() => handleCheckBox(option.value)}
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              <div>
                <MotionConfig
                  transition={{
                    duration: "0.25",
                    ease: "easeInOut"
                  }}
                >
                  <motion.button
                    type="submit"
                    className="body"
                    id="post_button"
                    whileHover={{ scale: 1.05, backgroundColor: "#fefea0", color: "#254336", cursor: "pointer" }}
                    whileTap={{ scale: 0.95, rotate: '3deg' }}
                  >
                    Post
                  </motion.button>
                </MotionConfig>
              </div>
            </div>
          </form>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover={false}
        draggable={false}
      />
    </section>
  );
};

export default MakePost;
