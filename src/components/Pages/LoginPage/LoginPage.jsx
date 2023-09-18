import React from 'react';
import "./LoginPage.css";
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import {Button, Box, FormControl, FormLabel} from "@chakra-ui/react"

function LoginPage() {
  const history = useHistory();

  return (
    <Box className='login-screen'>
    <div>
      <LoginForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          marginBottom={'20px'}
          onClick={() => {
            history.push('/registration');
          }}>
          Register Account
        </Button>
      </center>
    </div>
    </Box>
  );
}

export default LoginPage;
