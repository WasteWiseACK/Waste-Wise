import DisplayUser from "../components/DisplayUserInfo";
import UserPosts from "../components/UserPosts";
import LikedPosts from "../components/UsersLikedPosts";
import TEST from "../components/1FramerTest";
import DELAY from "../components/2FramerTest";

function UserPage() {
  // const navigate = useNavigate();
  // const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  // const [userProfile, setUserProfile] = useState(null);
  // const [errorText, setErrorText] = useState(null);
  // const { id } = useParams();
  // const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const [user, error] = await getUser(id);
  //     if (error) return setErrorText(error.message);
  //     setUserProfile(user);
  //   };

  //   loadUser();
  // }, [id]);

  // const handleLogout = async () => {
  //   logUserOut();
  //   setCurrentUser(null);
  //   navigate('/');
  // };

  // if (!userProfile && !errorText) return null;
  // if (errorText) return <p>{errorText}</p>;

  // // What parts of state would change if we altered our currentUser context?
  // // Ideally, this would update if we mutated it
  // // But we also have to consider that we may NOT be on the current users page
  // const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

  return <div className="container">
    <main className="main_user_container">
      {/* <button>Your Posts</button>
    <button>Liked Posts</button> */}
      {/* <LikedPosts /> */}

      <DisplayUser />


      <UserPosts />



    </main>


  </div>;
}

export default UserPage;