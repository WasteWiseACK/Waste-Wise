import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler } from "../utils/fetchingUtils";

function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const { currentUser } = useContext(CurrentUserContext);
    console.log(currentUser)

    const getAllUserPost = async (id) => {
        const [posts, error] = await fetchHandler(`/api/posts/user/${id}`);
        if (error) console.log(error);
        return posts || error;
    }
    const fetchUserPost = async () => {
        if (!currentUser || !currentUser.id) {
            console.log("No current user available");
            return;
        }
        const data = await getAllUserPost(currentUser.id);
        if (data) {
            setPosts(data)
        } else {
            setError('error')
        }
    }
    useEffect(() => {
        if (currentUser) {
            fetchUserPost();
        }
    }, [currentUser]);
    return (
        <div>
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