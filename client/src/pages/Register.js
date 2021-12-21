import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

import client from "../api/api-client";
import useStyles from "../hooks/useStyles";

const defaultFormValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  isAdmin: true,
};

const Register = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);

  const updateForm = (key, event) => {
    if (key === "name") {
      const username = event.target.value.toLowerCase().replace(" ", ".");
      setFormValues({ ...formValues, [key]: event.target.value, username });
    } else {
      setFormValues({ ...formValues, [key]: event.target.value });
    }

    validate();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await client("user", { body: formValues });
      navigate("/");
    } catch (err) {
      setError(err.error);
    }
  };

  const validatePassword = (password) => {
    if (!password) return false;
    if (password.length < 8) return false;
    return true;
  };

  const validate = () => {
    const { name, username, email, password } = formValues;

    if (!name || name.length < 3) {
      setCanSubmit(false);
      return;
    }

    if (!username || username.length < 3) {
      setCanSubmit(false);
      return;
    }

    if (!email) {
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
      className={classes.container}
    >
      <h2>Register</h2>

      {error ? (
        <div className="error">
          <p>{error}</p>
        </div>
      ) : null}

      <TextField
        label="Name"
        value={formValues.name}
        onChange={(e) => updateForm("name", e)}
      />

      <TextField
        label="Username"
        value={formValues.username}
        onChange={(e) => updateForm("username", e)}
      />

      <TextField
        type="email"
        label="Email address"
        value={formValues.email}
        onChange={(e) => updateForm("email", e)}
      />

      <TextField
        type="password"
        label="Password"
        value={formValues.password}
        onChange={(e) => updateForm("password", e)}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={!canSubmit}
      >
        Register
      </Button>
    </Stack>
  );
};

export default Register;
