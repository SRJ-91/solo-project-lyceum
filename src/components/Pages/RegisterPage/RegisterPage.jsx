import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { Button, Container, Flex, Heading, Box, FormControl, FormLabel, Input, FormHelperText, Textarea, Checkbox, Select } from "@chakra-ui/react"


function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
