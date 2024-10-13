import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import UserContextProvider from './contexts/CurrentUserContextProvider.jsx';
import './styles/index.css';
import FilteredFoodBanksContextProvider from './contexts/FilteredFoodBanksContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <FilteredFoodBanksContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FilteredFoodBanksContextProvider>
  </UserContextProvider>,
);
