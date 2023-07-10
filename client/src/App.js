import './App.css';
import Home from './components/Home/Home';
import { Routes, Route } from 'react-router-dom'
import PublicRoute from './routes/publicRoutes';
import ProtectedRoutes from './routes/privateRoutes';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Toaster } from 'react-hot-toast';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="App">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>


          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile/>} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
