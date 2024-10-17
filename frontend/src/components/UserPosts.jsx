// import { useContext, useEffect, useState } from "react";
// import CurrentUserContext from "../contexts/current-user-context";
// import { fetchHandler } from "../utils/fetchingUtils";

// function UserPosts() {
//     const [posts, setPosts] = useState([]);
//     const [error, setError] = useState('');
//     const { currentUser } = useContext(CurrentUserContext);
//     console.log(currentUser)

//     const getAllUserPost = async (id) => {
//         const [posts, error] = await fetchHandler(`api/posts/user/${id}`);
//         if (error) console.log(error);
//         return posts || [];
//     }
//     const fetchUserPost = async () => {
//         const [data, error] = await getAllUserPost(currentUser.id);
//         if (data) {
//             setPosts(data)
//         } if (error) {
//             setError(error)
//         }
//     }
//     useEffect(() => {
//         fetchUserPost();
//     }, []);
//     console.log(posts);

//     return (
//         <div>
//             <ul>
//                 {posts.map((post) => (
//                     <li key={post.id}>
//                         <div><h3>{post.username}</h3>{post.user_id === currentUser.id && (
//                             <button>Delete Post</button>
//                         )}</div>
//                         <div className="postInfo">
//                             <p>{post.title}</p>
//                             <p>{post.body}</p>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div >
//     )
// }


// export default UserPosts;