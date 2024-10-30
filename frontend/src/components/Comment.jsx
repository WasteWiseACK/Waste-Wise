import { useEffect, useState } from "react";
import { fetchHandler } from "../utils/fetchingUtils";

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    const fetchComments = async () => {
        const [data, error] = await fetchHandler(`/api/comments/posts/${postId}`);
        if (data) {
            setComments(data);
        }
        if (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId, comments]);

    if (error) return <p>Error loading comments: {error}</p>;

    return (
        <div className="comments_list" >
            <ul>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <li key={comment.id}>
                            <div className="commentInfo_container">
                                <div className="commentInfo">
                                    <div className="username_comment">
                                        <h3 className='body'>{comment.username}</h3>
                                    </div>
                                    <div className="date_comment">
                                        <p className="body">{comment.created_at.substring(0, 10)}</p>
                                    </div>
                                </div>


                                <p className="body">{comment.content}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>

    );
}

export default Comments;
