import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return <header>
    <nav>
      <ul>
        <li><NavLink className='nav_link' to='/'>HOME</NavLink></li>
        <li>
          <a href="#">WHY WE CARE</a>
          <ul className="drop_down">
            <li><NavLink className='nav_link' to='/IMPACT'>IMPACT</NavLink></li>
            <li><NavLink className='nav_link' to='/SOLUTIONS'>SOLUTIONS</NavLink></li>
            <li><NavLink className='nav_link' to='/FOOD_BANK'>FOOD BANKS</NavLink></li>
          </ul>
        </li>
        <li><NavLink className='nav_link' to='/FORUM'>FORUM</NavLink></li>
        {
          currentUser
            ? <>
              <li><NavLink to='/users' end={true}>Users</NavLink></li>
              <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
            </>
            : <>
              <li><NavLink to='/login'>Login</NavLink></li>
              <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
            </>
        }
      </ul>
    </nav>
  </header>;
}
