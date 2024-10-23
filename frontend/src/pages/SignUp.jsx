import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createUser } from "../adapters/user-adapter";
import TEST from '../components/1FramerTest'
import DELAY from '../components/2FramerTest'
import { motion, MotionConfig } from 'framer-motion'


// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // users shouldn't be able to see the sign up page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to 
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');
    if (!username || !password) return setErrorText('Missing username or password');

    const [user, error] = await createUser({ username, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  return <div>
    <div className="container">
      <section className="signup_container">

        <div className="signup_header">
          <h1 className="header1">Join the Dialogue at Waste Wise!</h1>
        </div>


        <TEST>
          <div>
            <form className="signup_form" onSubmit={handleSubmit} onChange={handleChange} aria-labelledby="create-heading">
              <h1 className="body" id="create-heading">Create New User</h1>
              <label htmlFor="username">Username</label>
              <input
                autoComplete="off"
                type="text"
                id="username"
                name="username"
                onChange={handleChange}
                value={username}
              />

              <label htmlFor="password">Password</label>
              <input
                autoComplete="off"
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={password}
              />

              {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
      <label htmlFor="password-confirm">Password Confirm</label>
      <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" /> */}

              <div className="button_filter">
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
                    Sign Up Now!
                  </motion.button>
                </MotionConfig>

              </div>

            </form>
            {!!errorText && <p>{errorText}</p>}
          </div>
        </TEST>

        <DELAY>
          <p className="body">Already have an account with us? <Link className="body" to="/login">Log in!</Link></p>
        </DELAY>

      </section>

    </div>
  </div>;
}