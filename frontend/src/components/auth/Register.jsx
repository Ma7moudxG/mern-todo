/* eslint-disable no-undef */
import React from 'react'
import classes from './AuthForm.module.scss'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const register = async (e) => {
    e.preventDefault();
    const user = {
        name : e.target.name.value,
        email : e.target.email.value,
        password : e.target.password.value,
    };
    try {
        await axios.post('/api/auth/register', user);
        navigate('/');
        toast.success('Registered Successfully');
    } catch(err) {
        console.log(err);
        toast.error('Register Failed')
    }
    
    }
  return (
    <div className={classes.register}>
        <h1 className={classes.title}>
            Register
        </h1>
        <form className={classes.authForm}
            onSubmit={register}
        >
            <label htmlFor="name">
                Name
                <input type='text' name="name" placeholder='Full Name' required />
            </label>
            <label htmlFor="email">
                Email
                <input type='email' name="email" placeholder='Email' required />
            </label>
            <label htmlFor="password">
                Password
                <input type='password' name="password" placeholder='Password' required />
            </label>
            <br/>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}
