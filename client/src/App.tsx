import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import GetLists from './functions/GetLists';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CountryDetailPage from './pages/CountryDetailPage';
import ActivityPage from './pages/ActivityPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CreateActivityPage from './pages/CreateActivityPage';
import NotFoundPage from './pages/NotFoundPage';

axios.defaults.baseURL = "http://localhost:4001";

function App() {
  GetLists();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<SignInPage />} />
        <Route path='/register' element={<SignUpPage />} />
        <Route path='/country/:id' element={<CountryDetailPage />} />
        <Route path='/activities' element={<ActivityPage />} />
        <Route path='/activity/:id' element={<ActivityDetailPage />} />
        <Route path='/add' element={<CreateActivityPage />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
