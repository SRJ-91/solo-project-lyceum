import React from 'react';
import "./RegisterPage.css";
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { Button, Container, Flex, Heading, Box, FormControl, FormLabel, Input, FormHelperText, Textarea, Checkbox, Select } from "@chakra-ui/react"


function RegisterPage() {
  const history = useHistory();

  return (
    <Box className='login-screen'>
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          marginBottom={'20px'}
          onClick={() => {
            history.push('/login');
          }}
        >
          Go to Login
        </Button>
      </center>
    </div>
    </Box>
  );
}

export default RegisterPage;
