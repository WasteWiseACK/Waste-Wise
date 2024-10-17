import { useContext, useEffect, useState } from "react";
import { fetchHandler, deleteOptions } from "../utils/fetchingUtils";
import CurrentUserContext from "../contexts/current-user-context";


function ForumPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useContext(CurrentUserContext);

    const handleDelete = async (postId) => {

        const deleteUrl = `/api/posts/${postId}`

        const [erase, error] = await fetchHandler(deleteUrl, deleteOptions)
        if (erase) {
            console.log('Has been deleted')
            fetchPosts()
        }
        if (error) {
            console.log('Error', error)
            setError(error)
        }
    }

    const fetchPosts = async () => {
        const [data, error] = await fetchHandler('/api/posts');
        console.log(data);
        if (data) {
            setPosts(data)
        } if (error) {
            setError(error)
        }
    }

    const handleDelete = async (postId) => {
        const [data, error] = await fetchHandler(`/api/posts/${postId}`, {
            method: 'DELETE',
        });
        if (data) {
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId)); // Remove the deleted post from the state
        }
        if (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [posts]);


    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <div><h3>{post.username}</h3>{post.user_id === currentUser.id && (
                            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                        )}</div>
                        <div className="postInfo">
                            <p>{post.title}</p>
                            <p>{post.body}</p>
                        </div>
                        <div>
                            <button>Comment</button>
                            <button>Like</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
};

export default ForumPost;