import React, { useContext } from 'react';
import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('logged out');
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <nav className='h-nav'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
                {
                    user && <span className='text-email'>{user.email}<button onClick={handleLogOut}>Sign out</button></span> 
                }
            </div>
        </nav>
    );
};

export default Header;