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
    <div className="section">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        {error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : null}

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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formValues.password}
            onChange={(e) => updateForm("password", e)}
          />
        </div>
        <div className="form__section">
          <input type="submit" value="Login" disabled={!canSubmit} />
        </div>
      </form>
    </div>
  );
};

export default Login;
