import React, { useState, useEffect} from 'react';
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
  const [formData, setFormData] = useState({
    name: "",
    size: "",
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
    name: yup.string().required('Name is required').min(2),
    size: yup.string().required(),
    sauce: yup.string().required(),
    protein: yup.string().required(),
    pineapple: yup.boolean(),
    onion: yup.boolean(),
    pepper: yup.boolean(),
    tomatoes: yup.boolean(),
    cheese: yup.boolean(),
    special: yup.string(),
});

const submit = () => {
    schema.validate(formData).then(() => {
        axios.post('https://reqres.in/api/users', formData).then((res) => {
            console.log('this is your posted data', res.data)
        })
    })
 }

 // handleChange function
 const hangleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        submit()
      }} 
      
      data-cy="submit"  style={{ margin: "20px auto", width: "50%" }}>
        <FormGroup>
          <legend>Name</legend>
          <Input
            type="name"
            name="name"
            value={formData.name}
            onChange={hangleChange}
            data-cy="name"
          />
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
              <div  onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: "small" });
                }}>
                Small
              </div>
              <div onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: "medium"});
                }}>
                Medium
              </div>
              <div onClick={() => {
                  toggle();
                  setFormData({ ...formData, size: "large" });
                }}>
                Large
              </div>
              <div
              onClick={() => {
                toggle();
                setFormData({ ...formData, size: "extra-large" });
              }}>
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
        <Button  >Submit</Button>
      </Form>
    </>
    )
}


export default OrderForm;