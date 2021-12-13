import { useContext, useState } from "react";

import { createRestaurant } from "../api/restaurant";
import { UserContext } from "../context/UserContext";

const defaultFormValues = {
  name: "",
};

const CreateRestaurant = () => {
  const { user, setUser } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);

  const updateForm = (key, event) => {
    setFormValues({ ...formValues, [key]: event.target.value });
    validate();
  };

  const validate = () => {
    const { name } = formValues;

    if (!name || name.length < 3) {
      setCanSubmit(false);
      return;
    }

    setCanSubmit(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const restaurantInfo = {
      name: formValues.name,
    };

    const { success, created, error } = await createRestaurant({
      ...restaurantInfo,
    });

    if (success) {
      setUser({ ...user, restaurant: created.restaurantId });
    } else {
      setError(error);
    }
  };

  return (
    <div className="section">
      <h2>New Restaurant</h2>
      <p>
        You need to add some details about your restaurant before we can
        continue.
      </p>
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
          <input
            type="submit"
            value="Update restaurant"
            disabled={!canSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateRestaurant;
