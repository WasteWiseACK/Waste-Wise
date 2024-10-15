import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import userIcon from '../imgs/user_icon.png'

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return <header>
    <nav className="nav-container">
      <ul>
        <li className="home"><NavLink className='nav_link' to='/'>HOME</NavLink></li>
        <li className='nav_link'>
          <a href="#">WHY WE CARE</a>
          <ul className="drop_down">
            <li><NavLink to='/IMPACT'>IMPACT</NavLink></li>
            <li><NavLink to='/SOLUTIONS'>SOLUTIONS</NavLink></li>
          </ul>
        </li>
        <li><NavLink to='/FOOD_BANK'>FOOD BANKS</NavLink></li>
        <li className='nav_link'><NavLink to='/FORUM'>FORUM</NavLink></li>
      </ul>
    </nav>
    <div className="nav-container">
      {
        currentUser
          ? <ul>
            {/* <li><NavLink to='/users' end={true}>Users</NavLink></li> */}
            <li className="logged_in"><NavLink to={`/users/${currentUser.id}`}><img src={userIcon} alt="user-icon" /></NavLink></li>
          </ul>
          : <ul>
            <li className="sign_up"><NavLink to='/sign-up'><img src={userIcon} alt="user-icon" /></NavLink></li>
          </ul>
      }
    </div>
  </header>;
}
