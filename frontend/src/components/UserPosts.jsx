import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, deleteOptions } from "../utils/fetchingUtils";

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useContext(CurrentUserContext);
    console.log(currentUser)
    if (currentUser) {
        console.log(currentUser.id)
    }
    const fetchUserPost = async () => {
        const data = await getAllUserPost(currentUser.id);
        if (data) {
            console.log("Updated Posts:", data);
            setPosts(data);
        } else {
            setPosts([]);
        }
    };
    const getAllUserPost = async (id) => {
        try {
            const [posts, error] = await fetchHandler(`/api/posts/user/${id}`);
            if (error) throw new Error('No posts found');
            return posts;
        } catch (error) {
            console.log(error.message);
            return [];
        }
    };
    // Delete post
    const handleDelete = async (postId) => {
        const deleteUrl = `/api/posts/${postId}`;
        const [erase, error] = await fetchHandler(deleteUrl, deleteOptions);
        if (erase) fetchUserPost();
        if (error) console.error(error);
    };

    useEffect(() => {
        if (currentUser) {
            fetchUserPost(currentUser.id);
        }
    }, [currentUser]);
    console.log("Posts Type:", typeof posts);

    return (
        <div>
            {error && <p>{error}</p>}
            {posts.length === 0 ? (
                <p>No posts to display.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <div><h3>{post.title}</h3>{post.user_id === currentUser.id && (
                                <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                            )}</div>
                            <div className="postInfo">
                                <p>{post.body}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div >
    )
}

export default UserPosts;