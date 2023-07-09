import { useState } from 'react';
import './Navbar.css';
import logo from './spaceX logo.jpeg';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = ({ modal }) => {
    const [visible, setVisible] = useState('');
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        setAuth({ ...auth, token: "" });
        localStorage.removeItem('auth-token');
        toast.success('Logged out successfully!')
    }

    const bringModal = () => {
        modal.current.style.top = '0px';
    }

    return (
        <header className='header'>
            <button className="nav-btn open-btn" onClick={() => setVisible('visible')}>
                <i className="fas fa-bars"></i>
            </button>
            <div className="main-logo"><img src={logo} alt="Logo" className="logo" /></div>
            <div className={`nav nav-black ${visible}`}>
                <div className={`nav nav-red ${visible}`}>
                    <nav className={`nav nav-white ${visible}`}>
                        <button className="nav-btn close-btn" onClick={() => setVisible('')}>
                            <i className="fas fa-times"></i>
                        </button>

                        <img src={logo} alt="Logo" className="logo" />

                        <ul className="list">
                            <li><Link to={'/'}>Teams</Link></li>
                            <li><Link to={'/'}>Locations</Link></li>
                            <li><Link to={'/'}>Life at Karands</Link></li>
                            <li>
                                <ul>
                                    <li>
                                        <Link to={'/'}>Karnads culture memo</Link>
                                    </li>
                                    <li>
                                        <Link to={'/'}>Inclusions and diversity</Link>
                                    </li>
                                    <li onClick={handleLogout} className='logout'>Logout</li>

                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <ul className="main-nav">
                <button className='create-post-btn btn' onClick={bringModal}>Create Post</button>
                <Link to={'/profile'}><img src={localStorage.getItem('profile')} alt="profile pic" title='Your profile'/></Link>
            </ul>
        </header>
    )
}

export default Navbar;