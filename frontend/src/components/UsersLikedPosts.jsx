import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, deleteOptions } from "../utils/fetchingUtils";

function LikedPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(CurrentUserContext);
    console.log(currentUser)
    if (currentUser) {
        console.log(currentUser.id)
    }
    const fetchLikedPosts = async () => {
        const [data, error] = await fetchHandler('/api/liked-posts');
        if (data) {
            setPosts(data);
        }
        if (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (currentUser) {
            fetchLikedPosts();
        }
    }, [currentUser]);
    return (
        <> <div>
            {error && <p>{error}</p>}
            {posts.length === 0 ? (
                <p>You haven't liked any posts yet.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <div><h3>{post.title}</h3></div>
                            <div className="postInfo">
                                <p>{post.body}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div >
        </>
    )
}

export default LikedPosts;