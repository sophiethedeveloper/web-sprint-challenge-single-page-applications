import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  Form,
  FormGroup,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
  Button,
} from "reactstrap";
import axios from "axios";
import * as yup from "yup";

const OrderForm = () => {
  //This state handles the drop down menu
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    size: 0,
    sauce: "",
    protein: "",
    pineapple: false,
    onion: false,
    pepper: false,
    tomatoes: false,
    cheese: false,
    special: "",
  });

  //validation
  const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(2),
    size: yup.number().required().positive().integer().min(1),
    sauce: yup.string().required(),
    protein: yup.string().required(),
    pineapple: yup.boolean(),
    onion: yup.boolean(),
    pepper: yup.boolean(),
    tomatoes: yup.boolean(),
    cheese: yup.boolean(),
    special: yup.string(),
  });

  // State for the error messages
  const [errors, setErrors] = useState({
    name: "",
    size: 0,
    sauce: "",
    protein: "",
    pineapple: false,
    onion: false,
    pepper: false,
    tomatoes: false,
    cheese: false,
    special: "",
  });

  useEffect(() => {
    /* We pass the entire state into the entire schema, no need to use reach here. 
    We want to make sure it is all valid before we allow a user to submit
    isValid comes from Yup directly */
    schema.isValid(formData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

  const inputChange = (e) => {
    // e.persist();
    yup
      .reach(schema, e.target.name)
      //we can then run validate using the value
      .validate(e.target.value)
      // if the validation is successful, we can clear the error message
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = () => {
    // schema.validate(formData).then(() => {
      axios
        .post("https://reqres.in/api/users", formData)
        .then((res) => {
          console.log("this is your posted data", res.data);

          //reset information on form
          setFormData({
            name: "",
            size: 0,
            sauce: "",
            protein: "",
            pineapple: false,
            onion: false,
            pepper: false,
            tomatoes: false,
            cheese: false,
            special: "",
          });
        })
        .catch((err) => console.log(err.response));
    // });
  };

  // handleChange function
  const hangleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // inputChange()
  };

  // handleToppings
  const handleToppings = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const toggle = () => setDropDownOpen((prevState) => !prevState);

  return (
    <>
      <Card color="info" style={{ margin: "40px auto" }}>
        <h2 style={{ color: "white", margin: "20px auto" }}>
          Create your own Pizza!
        </h2>
        <CardImg
          style={{ width: "80%", margin: "0 auto" }}
          src={require("../img/pizza-2.jpg")}
        />
      </Card>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        // onChange={inputChange}
        data-cy="submit"
        style={{ margin: "20px auto", width: "50%" }}
      >
        <FormGroup>
          <legend>Name</legend>
          <Input
            type="name"
            name="name"
            value={formData.name}
            onChange={hangleChange}
            data-cy="name"
          />
        <div>{errors.name}</div>

        </FormGroup>

        {/* To Select the pizza size */}

        <FormGroup>
          <Dropdown isOpen={dropDownOpen} toggle={toggle}>
            <DropdownToggle caret>
              {formData.size === 0 ? "Select Your Pizza Size" : formData.size}
            </DropdownToggle>
            <DropdownMenu>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: 0 });
                }}
              >
                --Select Your Size--
              </div>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: 1 });
                }}
              >
                Small
              </div>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: 2 });
                }}
              >
                Medium
              </div>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: 3 });
                }}
              >
                Large
              </div>
              <div
                onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: 4 });
                }}
              >
                Extra Large
              </div>
            </DropdownMenu>
          </Dropdown>
        </FormGroup>

        {/* form for the sauces */}

        <FormGroup tag="fieldset">
          <legend>Sauce</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="sauce"
                value="red"
                onChange={hangleChange}
              />
              Original Red
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="sauce"
                value="garlic-ranch"
                onChange={hangleChange}
              />
              Garlic Ranch
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="sauce"
                value="bbq"
                onChange={hangleChange}
              />
              BBQ Sauce
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="sauce"
                value="spinach-alfredo"
                onChange={hangleChange}
              />
              Spinach Alfredo
            </Label>
          </FormGroup>
        </FormGroup>

        {/* form for proteins */}

        <FormGroup tag="fieldset">
          <legend>Protein</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="beef"
                onChange={hangleChange}
              />
              Beef
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="chicken"
                onChange={hangleChange}
              />
              Chicken
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="pork"
                onChange={hangleChange}
              />
              Pork
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="pepperoni"
                onChange={hangleChange}
              />
              Pepperoni
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="sausage"
                onChange={hangleChange}
              />
              Sausage
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="protein"
                value="bacon"
                onChange={hangleChange}
              />
              Bacon
            </Label>
          </FormGroup>
        </FormGroup>

        {/* form for the toppings */}

        <FormGroup tag="fieldset">
          <legend>Toppings</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="pineapple"
                checked={formData.pineapple}
                onChange={handleToppings}
                data-cy="pineapple"
              />
              Pineapple
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="onion"
                checked={formData.onion}
                onChange={handleToppings}
                data-cy="onion"
              />
              Onion
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="pepper"
                checked={formData.pepper}
                onChange={handleToppings}
                data-cy="pepper"
              />
              Green Pepper
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="tomatoes"
                checked={formData.tomatoes}
                onChange={handleToppings}
                data-cy="tomatoes"
              />
              Diced Tomatoes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="cheese"
                checked={formData.cheese}
                onChange={handleToppings}
                data-cy="cheese"
              />
              Cheese
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <legend>Special Instructions</legend>
          <Input
            type="textarea"
            name="special"
            value={formData.specials}
            onChange={hangleChange}
          />
        </FormGroup>
        {/* <Link to="/final">
        
        </Link> */}
        {/* isabled={buttonDisabled} */}
        <Button disabled={buttonDisabled}>Submit</Button>
      </Form>
    </>
  );
};

export default OrderForm;
