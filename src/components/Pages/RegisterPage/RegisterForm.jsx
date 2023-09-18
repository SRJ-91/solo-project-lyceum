import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Flex, Heading, Box, FormControl, FormLabel, Input, FormHelperText, Textarea, Checkbox, Select } from "@chakra-ui/react"


function RegisterForm() {
  //State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [region, setRegion] = useState('');
  const [avatar, setAvatar] = useState('');

  //hooks
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        region: region,
        avatar: avatar,
      }
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Heading>Register User</Heading>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className='input-borders'>
        <label htmlFor="username">
          Username:
          <Input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div className='input-borders'>
        <label htmlFor="password">
          Password:
          <Input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label htmlFor="region">Region:</label>
        <Input
          type="text"
          id="region"
          placeholder="Continent-Timezone"
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        />

        <label htmlFor="avatar">Avatar:</label>
        <Input
          type="file"
          id="avatar"
          onChange={(event) => setAvatar(event.target.files[0])}
        />

      </div>
      <div>
        <Input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
