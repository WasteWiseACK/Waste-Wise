import { useState } from "react";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";
import { X } from "lucide-react";

function MakeAComment({ postId }) {
    const [isVisible, setIsVisible] = useState(true)
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
        }
        if (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const toggleVisible = () => {
        setIsVisible(!isVisible)
    }

    return (
        <>
            <div className="form_comment_popup">


                <form className="comment" onSubmit={handleSubmit} >
                    <div id="input">
                        <textarea className="text_area" value={createContent} onChange={(e) => setCreateContent(e.target.value)} placeholder="Comment.." required></textarea>
                        {/* <input type="text" placeholder="Comment.." value={createContent} onChange={(e) => setCreateContent(e.target.value)} /> */}
                    </div>
                    <div className="create_comment_button">
                        <button>Reply</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default MakeAComment;