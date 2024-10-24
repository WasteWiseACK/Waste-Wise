import { useContext, useEffect, useState } from "react";
import { fetchHandler, deleteOptions, getPostOptions } from "../utils/fetchingUtils";
import CurrentUserContext from "../contexts/current-user-context";
import MakeAComment from "./MakeAComment";
import Comments from "./Comment";
function ForumPost({ selectedTags }) {
    const [posts, setPosts] = useState([]);
    const [currentActivePost, setCurrentActivePost] = useState(null);
    const { currentUser } = useContext(CurrentUserContext);
    console.log(`selectedTags: ${selectedTags}`)
    // Fetch posts
    const fetchPosts = async () => {
        const [data, error] = await fetchHandler('/api/posts');
        if (data) { setPosts(data) };
        if (error) console.error(error);
    };
    // const fetchPosts = async () => {
    //     let query = '/api/posts';
    //     if (selectedTags.length > 0) {
    //         query += `?tags=${selectedTags.join(',')}`;
    //     }

    //     const [data, error] = await fetchHandler(query);
    //     if (data) {
    //         setPosts(data);
    //     }
    //     if (error) {
    //         console.error(error);
    //     }
    // };



    // Delete post
    const handleDelete = async (postId) => {
        const deleteUrl = `/api/posts/${postId}`;
        const [erase, error] = await fetchHandler(deleteUrl, deleteOptions);
        if (erase) fetchPosts();
        if (error) console.error(error);
    };

    const handleLike = async (postId, likedByCurrentUser) => {
        const postUrl = `/api/posts/${postId}/likes/toggle`
        const [data, error] = await fetchHandler(postUrl, getPostOptions({}));
        if (data) {
            console.log(data);
            setPosts(posts.map(post =>
                post.id === postId ? { ...post, likedByCurrentUser: !likedByCurrentUser } : post
            ));
        }
        if (error) console.error(error);
    }

    // Toggle current post for comment visibility
    const toggleCurrentPost = (postId) => {
        setCurrentActivePost(currentActivePost === postId ? null : postId);
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    console.log(posts)
    console.log(`currentactivepostid: ${currentActivePost}`)

    return (
        <div>
            <div className="community_forum">
                <h1 className="header2" id="community_forum">Community Forum</h1>
                <span className="underline"></span>
            </div>

            <div className="post_list_container">
                <ul className="post_list">
                    {posts.map((post) => (
                        <li key={post.id} className="post">
                            <div className="title_user">
                                <h3 className="special_home_problem" id="post_title">{post.title}</h3>
                                <div className="underline"></div>
                                <div className="user_date">
                                    <div className="username_post">
                                        <caption className="body">{post.username}</caption>
                                    </div>
                                    <div className="date_post">
                                        <p> {post.created_at.substring(0, 10)}</p>
                                    </div>
                                </div>


                            </div>
                            <div className="postInfo">

                                <p>{post.body}</p>

                            </div>
                            <div className="like_delete_buttons">
                                <div className="like_button">
                                    <button onClick={() => handleLike(post.id, post.likedByCurrentUser)}>
                                        {post.likedByCurrentUser ? "Unlike" : "Like"}
                                    </button>
                                </div>
                                <div className="delete_button">
                                    {currentUser && post.user_id === currentUser.id && (
                                        <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                                    )}
                                </div>
                            </div>

                            <div className="comment_button">
                                <button onClick={() => toggleCurrentPost(post.id)}>Comment</button>
                            </div>
                            {currentActivePost === post.id && (
                                <>

                                    <Comments postId={post.id} />
                                    <MakeAComment postId={post.id} />
                                </>
                            )}
                        </div>
                        <div className="postInfo">
                            <p> {post.created_at.substring(0, 10)}</p>
                            <p>{post.body}</p>
                            <p>Posted by: {post.username}</p>
                        </div>
                        <div>
                            {post.tags.length > 0 ? (<p>Tags: {post.tags.map(tag => tag.name).join(', ')}</p>) : (<p>No tags</p>)}
                        </div>
                        <div>
                            <button onClick={() => toggleCurrentPost(post.id)}>Comment</button>
                            <button onClick={() => handleLike(post.id, post.likedByCurrentUser)}>
                                {post.likedByCurrentUser ? "Unlike" : "Like"}
                            </button>
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
        </div >
    );
}

export default ForumPost;
