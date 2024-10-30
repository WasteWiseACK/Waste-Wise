import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, deleteOptions } from "../utils/fetchingUtils";
import { MotionConfig, motion } from "framer-motion";
import { Trash } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        if (erase) {
            fetchUserPost();
            toast.success('Your post has been deleted.')
        }
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
        <motion.div
            className="user_activity_container"
            variants={{
                hidden: { opacity: 0, y: 75 },
                visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
        >
            {error && <p>{error}</p>}
            <div className="user_buttons">
                <MotionConfig
                    transition={{
                        duration: "0.25",
                        ease: "easeInOut"
                    }}
                >
                    <motion.button
                        onClick={() => setShowLikedPosts(false)}
                        className="body"
                        id="reply_button"
                        whileHover={{ scale: 1.05, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
                        whileTap={{ scale: 0.95, rotate: '3deg' }}
                    >
                        My Posts
                    </motion.button>
                    <motion.button
                        onClick={() => setShowLikedPosts(true)}
                        className="body"
                        id="reply_button"
                        whileHover={{ scale: 1.05, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
                        whileTap={{ scale: 0.95, rotate: '3deg' }}
                    >
                        Liked Posts
                    </motion.button>
                </MotionConfig>

            </div>
            <div className="user_post_container">
                <ul className="user_post_list">
                    {posts.length === 0 ? (
                        <p>{showLikedPosts ? "You haven't liked any posts yet." : "You haven't created any posts yet."}</p>
                    ) : (
                        posts.map((post) => (
                            <li className="user_post_likes" key={post.id}>
                                <div className="title_user">
                                    <div className="title_delete_button">
                                        <div className="post_title">
                                            <h3 id="post_title" className="mission_statement">{post.title}</h3>
                                        </div>

                                        <div className="delete_button">
                                            {post.user_id === currentUser.id && (
                                                <button onClick={() => handleDelete(post.id)}><Trash /></button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="underline"></div>

                                    <div className="user_date">
                                        <div className="username_post">
                                            <p className="body">{post.username}</p>
                                        </div>
                                        <p className="body">{post.created_at.substring(0, 10)}</p>
                                    </div>


                                </div>
                                <div className="postInfo">
                                    <div className="text_body">
                                        <p className="body_post" id="body_post_configuration">{post.body}</p>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                closeOnClick={false}
                pauseOnHover={false}
                draggable={false}
            />
        </motion.div>

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