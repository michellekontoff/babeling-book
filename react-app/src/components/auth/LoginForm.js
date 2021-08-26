import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-form auth-form'>
    <form onSubmit={onLogin}>
      <div>
        {/* <label htmlFor='email'>Email</label> */}
        <p className='errors'>{errors?.email}</p>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
          placeholder='Email'
        />
      </div>
      <div>
        {/* <label htmlFor='password'>Password</label> */}
        <p className='errors'>{errors?.password}</p>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
          placeholder='Password'
        />
        <button type='submit'>Login</button>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
