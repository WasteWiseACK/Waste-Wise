import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { logUserOut } from "../adapters/auth-adapter";
import { getUser } from "../adapters/user-adapter";
import { MotionConfig, motion } from "framer-motion";
import laptop from "../assets/laptop.png";
import cheer from "../assets/cheer.png";
import twosmiski from "../assets/2smiski.png";
import duck from "../assets/duck.png";
import daydream from "../assets/daydream.png";
import yoga from "../assets/yoga.png";

function DisplayUser() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [userProfile, setUserProfile] = useState(null);
    const [errorText, setErrorText] = useState(null);
    const { id } = useParams();
    const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

    useEffect(() => {
        const loadUser = async () => {
            const [user, error] = await getUser(id);
            if (error) return setErrorText(error.message);
            setUserProfile(user);
        };

        loadUser();
    }, [id]);

    const handleLogout = async () => {
        logUserOut();
        setCurrentUser(null);
        navigate('/');
    };

    if (!userProfile && !errorText) return null;
    if (errorText) return <p>{errorText}</p>;

    // What parts of state would change if we altered our currentUser context?
    // Ideally, this would update if we mutated it
    // But we also have to consider that we may NOT be on the current users page
    const profileUsername = isCurrentUserProfile ? currentUser.username : userProfile.username;

    const handleOnClick = async (event) => {
        event.preventDefault();
        navigate(`/users/${id}/edit`)
    }

    console.log(laptop);

    return (
        <div className="user_info_container">
            <h1 className="header2">{profileUsername}</h1>
            {currentUser.profile_pic ? <img src={currentUser.profile_pic}></img > : <img src="https://i.pinimg.com/originals/0e/00/ae/0e00ae2c78e80f3a588cd27b027ee544.png" alt="Green charaacter on laptop" />}
            <button className="body" id="edit_button" onClick={handleOnClick}>Edit</button>

            <div className="user_borough_container">
                <p className="body" id="bio"></p>
                {currentUser.borough ? <p className="body">Based in: {currentUser.borough}</p> : <p className="body">You haven't set your location yet.</p>}
            </div>

            {currentUser.bio ? <p className="body">{currentUser.bio}</p> : <p className="body">Add something to your about me!</p>}

            <div className="user_link_container">
                <p className="body" id="bio">Links</p>
                {currentUser.other_form_of_contact ? <p className="body">{currentUser.other_form_of_contact}</p> : <p className="body"></p>}
            </div>
            <MotionConfig>
                {!!isCurrentUserProfile &&
                    <motion.button
                        className="body"
                        onClick={handleLogout}
                        whileHover={{ scale: 1.05, backgroundColor: "#254336", color: "#f5f0d4", cursor: "pointer" }}
                        whileTap={{ scale: 0.95, rotate: '3deg' }}
                        id="page_change"
                    >
                        Log Out

                    </motion.button>}
            </MotionConfig>

        </div>
    )
}

export default DisplayUser;