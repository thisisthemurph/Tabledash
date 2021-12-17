import { Button, Stack, TextField } from "@mui/material";
import { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";

const defaultFormValues = {
  username: "",
  password: "",
};

const Login = () => {
  const { login } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);

  const updateForm = (key, event) => {
    setFormValues({ ...formValues, [key]: event.target.value });
    validate();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      login({ ...formValues });
    } catch (error) {
      setError(error.error);
    }
  };

  const validatePassword = (password) => {
    if (!password) return false;
    if (password.length < 8) return false;
    return true;
  };

  const validate = () => {
    const { username, password } = formValues;

    if (!username || username.length < 3) {
      setCanSubmit(false);
      return;
    }

    if (!validatePassword(password)) {
      setCanSubmit(false);
      return;
    }

    setCanSubmit(true);
  };

  return (
    <Stack
      component="form"
      spacing={2}
      onSubmit={handleSubmit}
      className="section"
    >
      <h2>Login</h2>
      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : null}

      <TextField
        id="username"
        label="Username"
        value={formValues.username}
        onChange={(e) => updateForm("username", e)}
      />

      <TextField
        id="username"
        label="Password"
        type="password"
        value={formValues.password}
        onChange={(e) => updateForm("password", e)}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!canSubmit}
      >
        Login
      </Button>
    </Stack>
  );
};

export default Login;
