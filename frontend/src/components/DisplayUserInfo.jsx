import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { logUserOut } from "../adapters/auth-adapter";
import { getUser } from "../adapters/user-adapter";

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

    return (
        <>
            <h1>{profileUsername}</h1>
            {currentUser.profile_pic ? <img src={currentUser.profile_pic}></img > : <img src='data:image/jpeg;base64,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'></img>}
            <button onClick={handleOnClick}>Edit</button>
            {currentUser.borough ? <p>{currentUser.borough}</p> : <p>You haven't set your location yet.</p>}
            {currentUser.bio ? <p>{currentUser.bio}</p> : <p>Add something to your about me!</p>}
            {currentUser.other_form_of_contact ? <p>{currentUser.other_form_of_contact}</p> : <p></p>}
            {!!isCurrentUserProfile && <button onClick={handleLogout}>Log Out</button>}
        </>
    )
}

export default DisplayUser;