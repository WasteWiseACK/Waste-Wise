import { useNavigate } from "react-router-dom";
import { updateUsername } from "../adapters/user-adapter";
import { useState, useEffect } from "react";

export default function UpdateUsernameForm({ currentUser, setCurrentUser }) {
  const boroughs = [
    { value: '', label: 'Select your borough' },
    { value: 'manhattan', label: 'Manhattan' },
    { value: 'brooklyn', label: 'Brooklyn' },
    { value: 'queens', label: 'Queens' },
    { value: 'bronx', label: 'The Bronx' },
    { value: 'staten_island', label: 'Staten Island' },
  ];

  const navigate = useNavigate();
  const [userBio, setUserBio] = useState('');
  const [username, setUsername] = useState('');
  const [userBorough, setUserBorough] = useState('');
  const [userContacts, setUserContacts] = useState('');


  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setUserBio(currentUser.bio || '');
      setUserBorough(currentUser.borough || '');
      setUserContacts(currentUser.other_forms_of_contact || '');
    }
  }, [currentUser])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const [user, error] = await updateUsername(Object.fromEntries(formData));
    // If our user isn't who they say they are
    // (an auth error on update) log them out
    // We added the httpStatus as a custom cause in our error
    if (error?.cause > 400 && error?.cause < 500) {
      setCurrentUser(null);
      return navigate('/');
    }

    setCurrentUser(user);
    event.target.reset();
  };

  return <form onSubmit={handleSubmit} aria-labelledby="update-heading">
    <h2 id="update-heading">Update your account {currentUser.username} </h2>
    <label>
      Username:
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </label>
    <br />
    <label>
      Location:
      <select
        value={userBorough}
        onChange={(e) => setUserBorough(e.target.value)}
      >
        {boroughs.map((b) => (
          <option key={b.value} value={b.value}>
            {b.label}
          </option>
        ))}
      </select>
    </label>
    <label>
      Bio (Tell us a little about yourself)
      <textarea
        value={userBio}
        onChange={(e) => setUserBio(e.target.value)}
      />
    </label>
    <br />
    <label>
      Where else can people find you?
      <textarea
        value={userContacts}
        onChange={(e) => setUserContacts(e.target.value)}
      />
    </label>
    <input type="hidden" name="id" value={currentUser.id} />

    <button>Submit changes</button>
  </form>;
}
