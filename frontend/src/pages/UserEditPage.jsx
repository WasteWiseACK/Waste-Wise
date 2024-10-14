import UpdateUsernameForm from "../components/UpdateUsernameForm";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
function EditPage() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    return (
        <>
            <UpdateUsernameForm currentUser={currentUser} setCurrentUser={setCurrentUser} />
        </>
    )
};

export default EditPage;