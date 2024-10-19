import { useState } from "react";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";


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
        }
        if (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <>
            <div className="form_popup">
                <form className="comment" onSubmit={handleSubmit} >
                    <div id="input">
                        <textarea value={createContent} onChange={(e) => setCreateContent(e.target.value)} placeholder="Comment.."></textarea>
                        {/* <input type="text" placeholder="Comment.." value={createContent} onChange={(e) => setCreateContent(e.target.value)} /> */}
                    </div>
                    <div>
                        <button>Comment</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default MakeAComment;