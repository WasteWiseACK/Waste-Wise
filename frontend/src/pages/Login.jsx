import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import { MotionConfig, motion } from "framer-motion";
import TEST from "../components/1FramerTest";
import CurrentUserContext from "../contexts/current-user-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // users shouldn't be able to see the login page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to 
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    const formData = new FormData(event.target);
    const [user, error] = await logUserIn(Object.fromEntries(formData));
    if (error) return setErrorText(error.message);
    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  return <div className="container">
    <section className="signup_container">
      <div className="signup_header">
        <h1 className="header2">WELCOME</h1>
      </div>

      <TEST>
        <div className="signup_container">
          <form className="signup_form" onSubmit={handleSubmit} aria-labelledby="login-heading">
            <h1 id='create-heading' className="body">Log back in!</h1>
            <label htmlFor="username">Username</label>
            <input type="text" autoComplete="username" id="username" name="username" />

            <label htmlFor="password">Password</label>
            <input type="password" autoComplete="current-password" id="password" name="password" />
            <div className="signup_button">
              <MotionConfig
                transition={{
                  duration: "0.25",
                  ease: "easeInOut"
                }}
              >
                <motion.button
                  className="body"
                  id="filtering"
                  whileHover={{ scale: 1.05, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
                  whileTap={{ scale: 0.95, rotate: '3deg' }}
                >
                  Log in!
                </motion.button>
              </MotionConfig>
            </div>

          </form>
        </div>
      </TEST>

    </section>


    {!!errorText && <p>{errorText}</p>}
  </div>;
}