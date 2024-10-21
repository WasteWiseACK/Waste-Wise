import { NavLink } from "react-router-dom"


const Content = () => {
  return (
    <>
      <div className="footer_info_container">
        <ul className="footer_links">
          <li className="body"><NavLink to={'/'}>Home</NavLink></li>
          <li className="body"><NavLink to={'/IMPACT'}>IMPACT</NavLink></li>
          <li className="body"><NavLink to={'/SOLUTIONS'}>SOLUTIONS</NavLink></li>
          <li className="body"><NavLink to={'/FOOD_BANK'}>FOOD BANKS</NavLink></li>
          <li className="body"><NavLink to={'/FORUM'}>FORUM</NavLink></li>
          <li className="body"><NavLink to={'/About_Us'}>About Us</NavLink></li>
        </ul>

      </div>
    </>
  )
}

export default Content