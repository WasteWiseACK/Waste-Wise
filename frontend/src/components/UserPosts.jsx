import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, deleteOptions } from "../utils/fetchingUtils";

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [showLikedPosts, setShowLikedPosts] = useState(false);
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
    const fetchLikedPosts = async () => {
        const [data, error] = await fetchHandler('/api/liked-posts');
        if (data) {
            setPosts(data);
        }
        if (error) {
            console.error(error);
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
            if (showLikedPosts) {
                console.log('these are the liked posts')
                fetchLikedPosts();
            } else {
                fetchUserPost();
            }
        }
    }, [currentUser, showLikedPosts]);
    // console.log("Posts Type:", typeof posts);

    return (
        <div>
            {error && <p>{error}</p>}
            <button onClick={() => setShowLikedPosts(false)}>My Posts</button>
            <button onClick={() => setShowLikedPosts(true)}>Liked Posts</button>
            <ul>
                {posts.length === 0 ? (
                    <p>{showLikedPosts ? "You haven't liked any posts yet." : "You haven't created any posts yet."}</p>
                ) : (
                    posts.map((post) => (
                        <li key={post.id}>
                            <div>
                                <h3>{post.title}</h3>
                                <p>{post.created_at.substring(0, 10)}</p>
                                {post.user_id === currentUser.id && (
                                    <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                                )}
                            </div>
                            <div className="postInfo">
                                <p>{post.body}</p>
                                <p>Posted by: {post.username}</p>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>

        // <div>
        //     {error && <p>{error}</p>}
        //     {posts.length === 0 ? (
        //         <p>No posts to display.</p>
        //     ) : (
        //         <ul>
        //             {posts.map((post) => (
        //                 <li key={post.id}>
        //                     <div><h3>{post.title}</h3>{post.user_id === currentUser.id && (
        //                         <button onClick={() => handleDelete(post.id)}>Delete Post</button>
        //                     )}</div>
        //                     <div className="postInfo">
        //                         <p>{post.body}</p>
        //                     </div>
        //                 </li>
        //             ))}
        //         </ul>
        //     )}
        // </div >
    )
}

export default UserPosts;