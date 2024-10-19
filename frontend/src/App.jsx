import { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import SiteHeadingAndNav from './components/SiteHeadingAndNav';
import NotFoundPage from './pages/NotFound';
import UserContext from './contexts/current-user-context';
import { checkForLoggedInUser } from './adapters/auth-adapter';
import UsersPage from './pages/Users';
import UserPage from './pages/User';
import Solutions from './pages/Solutions'
import FoodBank from './pages/FoodBanks';
import Impact from './pages/Impact';
import UserEditPage from './pages/UserEditPage';
import Forum from './pages/Forum';

export default function App() {
  const { setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    checkForLoggedInUser().then(setCurrentUser);
  }, [setCurrentUser]);

  return <>
    <SiteHeadingAndNav />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/users' element={<UsersPage />} />
      <Route path='/users/:id' element={<UserPage />} />
      <Route path='/users/:id/edit' element={<UserEditPage />} />
      <Route path='/SOLUTIONS' element={<Solutions />} />
      <Route path='/IMPACT' element={<Impact />} />
      <Route path='/FOOD_BANK' element={<FoodBank />} />
      <Route path='/FORUM' element={<Forum />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </>;
}
