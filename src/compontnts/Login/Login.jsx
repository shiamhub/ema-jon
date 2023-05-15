import React, { useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
const Login = () => {
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
            navigate(from, {replace: true});
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div className='form-con'>
            <h1 className='form-title'>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email'
                    required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name='password'
                    required />
                    <p onClick={() => setShow(!show)}><small>
                        {
                            show ? 'Hide Password' : 'Show Password'
                        }
                        </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New To Eam-john? </small> <Link to='/signup'>Create New Account</Link></p>
        </div>
    );
};

export default Login;