import { useState } from "react";

import client from "../api/api-client";

const defaultFormValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  isAdmin: true,
};

const Register = () => {
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
      const response = await client("user", { body: formValues });
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
    <div className="section">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : null}

        <div className="form__section">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formValues.name}
            onChange={(e) => updateForm("name", e)}
          />
        </div>
        <div className="form__section">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formValues.username}
            onChange={(e) => updateForm("username", e)}
          />
        </div>
        <div className="form__section">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="you@domain.com"
            value={formValues.email}
            onChange={(e) => updateForm("email", e)}
          />
        </div>
        <div className="form__section">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formValues.password}
            onChange={(e) => updateForm("password", e)}
          />
        </div>
        <div className="form__section">
          <input type="submit" value="Register" disabled={!canSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Register;
