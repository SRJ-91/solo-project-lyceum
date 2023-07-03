import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { Button, Container, Flex, Heading, Box, FormControl, FormLabel, Input, FormHelperText, Textarea, Checkbox, Select } from "@chakra-ui/react"


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <Heading>Login</Heading>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className='input-borders'>
        <FormControl>
        <label htmlFor="username">
          <FormLabel> Username:</FormLabel>
          <Input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        </FormControl>
      </div>
      <div className='input-borders'>
        <FormControl>
        <label htmlFor="password">
          <FormLabel>Password:</FormLabel>
          <Input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        </FormControl>
      </div>
      <div>
        <Input className="btn" type="submit" name="submit" value="Log In"/>
      </div>
    </form>
  );
}

export default LoginForm;
