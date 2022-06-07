import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/home';
import Signup from "./components/pages/signup";
import Login from "./components/pages/login";
import Error from "./components/pages/error";
import './styles/main.scss';
import ChooseMember from './components/pages/loggedIn/chooseMember';
import AddMember from './components/forms/addMember';
import Calendar from './components/pages/loggedIn/calendar';
import Lists from './components/pages/loggedIn/lists';
import Profile from './components/pages/loggedIn/profile';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/member" element={<ChooseMember />} />
        <Route exact path="/add-member" element={<AddMember />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/lists" element={<Lists />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
