import { useState } from "react";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";
import { MotionConfig, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



function MakeAComment({ postId }) {

    const [createContent, setCreateContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentData = {
            content: createContent,
            postId: postId
        };
        const [comment, error] = await fetchHandler('/api/comments', getPostOptions(commentData));
        if (comment) {
            console.log("comment created:", commentData);
            setCreateContent('');  // Clear the input field after successful submission
            toast.success("Your comment has been posted!")

        }
        if (error) {
            console.error("Error submitting comment:", error);
        }
    };


    return (
        <>
            <div className="form_comment_popup">


                <form className="comment" onSubmit={handleSubmit} >
                    <div id="input">
                        <textarea className="text_area" value={createContent} onChange={(e) => setCreateContent(e.target.value)} placeholder="Comment..." required></textarea>
                        {/* <input type="text" placeholder="Comment.." value={createContent} onChange={(e) => setCreateContent(e.target.value)} /> */}
                    </div>
                    <div className="create_comment_button">
                        <MotionConfig
                            transition={{
                                duration: "0.25",
                                ease: "easeInOut"
                            }}
                        >
                            <motion.button
                                className="reply_button body"
                                whileHover={{ scale: 1.05, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
                                whileTap={{ scale: 0.95, rotate: '3deg' }}
                            >
                                Reply
                            </motion.button>
                        </MotionConfig>

                    </div>

                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnHover={false}
                draggable={false}
            />
        </>
    )
}

export default MakeAComment;