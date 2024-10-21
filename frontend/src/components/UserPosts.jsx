import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler } from "../utils/fetchingUtils";

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useContext(CurrentUserContext);
    console.log(currentUser)
    if (currentUser) {
        console.log(currentUser.id)
    }
    const getAllUserPost = async (id) => {
        const [posts, error] = await fetchHandler(`/api/posts/user/${id}`);
        if (error) console.log(error);
        return posts;
    }

    const fetchUserPost = async () => {
        const data = await getAllUserPost(currentUser.id);
        if (data) {
            console.log("Updated Posts:", data)
            setPosts(data)
        }
    }
    useEffect(() => {
        if (currentUser) {
            fetchUserPost(currentUser.id);
        }
    }, [currentUser]);
    console.log("Posts Type:", typeof posts);

    return (
        <div>
            {error && <p>{error}</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <div><h3>{post.title}</h3>{post.user_id === currentUser.id && (
                            <button>Delete Post</button>
                        )}</div>
                        <div className="postInfo">
                            <p>{post.body}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    )
}

export default UserPosts;