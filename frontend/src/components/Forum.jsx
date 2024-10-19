import { useContext, useEffect, useState } from "react";
import { fetchHandler, deleteOptions } from "../utils/fetchingUtils";
import CurrentUserContext from "../contexts/current-user-context";
import MakeAComment from "./MakeAComment";
import Comments from "./Comment";
function ForumPost() {
    const [posts, setPosts] = useState([]);
    const [currentActivePost, setCurrentActivePost] = useState(null);
    const { currentUser } = useContext(CurrentUserContext);

<<<<<<< HEAD
    // const handleDelete = async (postId) => {

    //     const deleteUrl = `/api/posts/${postId}`

    //     const [erase, error] = await fetchHandler(deleteUrl, deleteOptions)
    //     if (erase) {
    //         console.log('Has been deleted')
    //         fetchPosts()
    //     }
    //     if (error) {
    //         console.log('Error', error)
    //         setError(error)
    //     }
    // }

=======
    // Fetch posts
>>>>>>> c6893173aa4d49392c095892e9228dda218b02f1
    const fetchPosts = async () => {
        const [data, error] = await fetchHandler('/api/posts');
        if (data) setPosts(data);
        if (error) console.error(error);
    };


    // Delete post
    const handleDelete = async (postId) => {
        const deleteUrl = `/api/posts/${postId}`;
        const [erase, error] = await fetchHandler(deleteUrl, deleteOptions);
        if (erase) fetchPosts();
        if (error) console.error(error);
    };

    // Toggle current post for comment visibility
    const toggleCurrentPost = (postId) => {
        setCurrentActivePost(currentActivePost === postId ? null : postId);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(`currentactivepostid: ${currentActivePost}`)

    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <div>
                            <h3>{post.username}</h3>
                            {currentUser && post.user_id === currentUser.id && (
                                <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                            )}
                        </div>
                        <div className="postInfo">
                            <p>{post.title}</p>
                            <p>{post.body}</p>
                        </div>
                        <div>
                            <button onClick={() => toggleCurrentPost(post.id)}>Comment</button>
                            <button>Like</button>
                        </div>
                        {currentActivePost === post.id && (
                            <>
                                <MakeAComment postId={post.id} />
                                <Comments postId={post.id} />
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ForumPost;
