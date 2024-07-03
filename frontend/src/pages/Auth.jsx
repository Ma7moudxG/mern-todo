import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';
import classes from './Auth.module.scss';

function Auth() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState(false)

  const loginTrigger = () => {
    setLogin(!login);
  }
  useEffect(() => {
    if (auth) {
      navigate('/');
    }
    else navigate('/auth');
  }, [auth, navigate]);

  return (
    <Layout>
      <div className={classes.form_container}>
        { login && (
          <div className={classes.forms}>
            <Login />
            <p>new user? <a href="#" onClick={loginTrigger}> Create an account now</a></p>
          </div>
          ) }
        { !login && (
          <div className={classes.forms}>
            <Register />
            <br />
            <p>Already have an account? <a href="#" onClick = {loginTrigger}>Log in</a></p>
          </div>
          ) }
      </div>
    </Layout>
  );
}

export default Auth;