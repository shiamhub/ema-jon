import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const SignUp = () => {
    const [error, setError] = React.useState('');
    const {createUser} = useContext(AuthContext);

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        if(password !== confirm) {
            setError('Passwords do not match');
            return
        }
        else if(password.length < 6) {
            setError('password must be at least 6 characters');
            return
        }
        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset();
        })
        .catch(error => {
            setError(error.message);
            console.error(error);
        })
    }

    return (
        <div className='form-con'>
            <h1 className='form-title'>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email'
                    required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password'
                    required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm'
                    required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p><small>Already have an account?<Link to='/login'>Login</Link> </small></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;