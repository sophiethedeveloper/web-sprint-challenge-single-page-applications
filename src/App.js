import React from "react";
import { Button, Navbar, Card, CardImg } from "reactstrap";
import { Route, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar color="success">
        <h1 style={{ color: "white" }}>Lambda Eats</h1>
        <Link to="/">
          <Button color="info">Home</Button>
        </Link>
      </Navbar>
      <Route exact path="/">
        <Card style={{height: "80%", margin: "0 auto"}}>
          <CardImg src={require("./img/pizza.jpg")} />
          <Link to={"/pizza"}>
            <Button
              color="info"
              style={{ position: "absolute", left: "50%", top: "50%" }}
            >
              Pizza?
            </Button>
          </Link>
        </Card>
      </Route>
      <Route path='/pizza'>
        {/* <OrderForm /> */}
      </Route>
      <Route path="/final">
        {/* <Final /> */}
      </Route>
    </>
  );
};
export default App;
