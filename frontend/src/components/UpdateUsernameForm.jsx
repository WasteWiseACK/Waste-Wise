import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";
import { useState, useEffect } from "react";
import { MotionConfig, motion } from "framer-motion";
import laptop from "../assets/laptop.png";
import cheer from "../assets/cheer.png";
import twosmiski from "../assets/2smiski.png";
import duck from "../assets/duck.png";
import daydream from "../assets/daydream.png";
import yoga from "../assets/yoga.png";

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const boroughs = [
    { value: '', label: 'Select your borough' },
    { value: 'manhattan', label: 'Manhattan' },
    { value: 'brooklyn', label: 'Brooklyn' },
    { value: 'queens', label: 'Queens' },
    { value: 'bronx', label: 'The Bronx' },
    { value: 'staten_island', label: 'Staten Island' },
  ];

  const profileImages = [
    { src: laptop, label: 'laptop.png' },
    { src: cheer, label: 'cheer.png' },
    { src: yoga, label: 'yoga.png' },
    { src: twosmiski, label: 'twosmiski.png' },
    { src: duck, label: 'duck.png' },
    { src: daydream, label: 'daydream.png' }
  ];

  const navigate = useNavigate();
  const [userBio, setUserBio] = useState('');
  const [username, setUsername] = useState('');
  const [userBorough, setUserBorough] = useState('');
  const [userContacts, setUserContacts] = useState('');
  const [selectImg, setSelectImg] = useState(null);


  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setUserBio(currentUser.bio || '');
      setUserBorough(currentUser.borough || '');
      setUserContacts(currentUser.other_form_of_contact || '');
      setSelectImg(currentUser.profile_pic || '');
    }
  }, [currentUser])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updateData = {
      id: currentUser.id,
      username: username || currentUser.username,
      bio: userBio || currentUser.bio,
      borough: userBorough || currentUser.borough,
      other_form_of_contact: userContacts || currentUser.other_form_of_contact,
      profile_pic: selectImg || currentUser.profile_pic
    };
    console.log('Updating user:', updateData);
    console.log('this is the img', selectImg)
    const [user, error] = await updateUsername(updateData);
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    // We added the httpStatus as a custom cause in our error
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
    return navigate(`/users/${currentUser.id}`)
  };

  return <div className="container">
    <section className="update_container">
      <form onSubmit={handleSubmit} aria-labelledby="update-heading" className="update_form">
        <div className="update_title">
          <h2 className="special_home_problem" id="update-heading">Update your account</h2>
          <h2 className="header2" id="update_username">
            {currentUser.username}
          </h2>
        </div>
        <div className="input_username_container">
          <p className="body">Username</p>
          <textarea
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="update_textarea_username"
            className="text_area"
          />
        </div>
        <div className="profile-image-selection">
          <p className="body">Choose a Profile Picture</p>
          <div className="image-options">
            {profileImages.map((img, index) => (
              <img
                key={index}
                src={img.src}
                alt={`Option ${index + 1}`}
                onClick={() => { setSelectImg(img.src); console.log(img.src) }}
                style={{
                  border: selectImg === img.src ? "3px solid green" : "2px solid gray",
                  borderRadius: "50%",
                  cursor: "pointer",
                  width: 60,
                  margin: "5px"
                }}
              />
            ))}
          </div>
        </div>


        <br />

        <div className="update_location_container">
          <p className="body">Location</p>
          <MotionConfig
            transition={{
              duration: "0.25",
              ease: "easeInOut"
            }}
          >
            <motion.select
              value={userBorough}
              onChange={(e) => setUserBorough(e.target.value)}
              id="update_boroughs"
              className="body"
              whileHover={{ scale: 1.02, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
            >
              {boroughs.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </motion.select>
          </MotionConfig>

        </div>



        <label className="body">
          Bio
          <textarea
            value={userBio}
            onChange={(e) => setUserBio(e.target.value)}
            className="text_area"
          />
        </label>
        <br />
        <label className="body">
          Where else can people find you?
          <textarea
            value={userContacts}
            onChange={(e) => setUserContacts(e.target.value)}
            className="text_area"
          />
        </label>
        <input type="hidden" name="id" value={currentUser.id} />
        <div className="update_button">
          <MotionConfig
            transition={{
              duration: "0.25",
              ease: "easeInOut"
            }}
          >
            <motion.button
              className="body"
              whileHover={{ scale: 1.05, backgroundColor: "#6b8a7a", color: "#fefae0", cursor: "pointer" }}
              whileTap={{ scale: 0.95, rotate: '3deg' }}
              id="filtering_button"
            >
              Submit changes
            </motion.button>
          </MotionConfig>

        </div>

      </form>
    </section>

  </div>
}
