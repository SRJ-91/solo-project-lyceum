import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import {Button, FormControl, FormLabel} from "@chakra-ui/react"

function LoginPage() {
  const history = useHistory();

  return (
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
  );
}

export default LoginPage;
