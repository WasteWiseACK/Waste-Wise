import { useContext, useEffect, useState } from "react";
import { fetchHandler } from "../utils/fetchingUtils";
import CurrentUserContext from "../contexts/current-user-context";


function ForumPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useContext(CurrentUserContext);

    const fetchPosts = async () => {
        const [data, error] = await fetchHandler('/api/posts');
        console.log(data);
        if (data) {
            setPosts(data)
        } if (error) {
            setError(error)
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <div><h3>{post.username}</h3>{post.user_id === currentUser.id && (
                            <button>Delete Post</button>
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