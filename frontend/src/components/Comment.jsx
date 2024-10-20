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
    }, [postId]);

    if (error) return <p>Error loading comments: {error}</p>;

    return (
        <ul>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                comments.map((comment) => (
                    <li key={comment.id}>
                        <div className="commentInfo">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
}

export default Comments;
