import React from "react";
import { CardImg, Card } from "reactstrap";

const Final = () => {
  return (
    <>
      <Card style={{ width: "40%", margin: "20px auto" }}>
        <h2 style={{ margin: "20px auto", textAlign: "center", fontSize: "30px" }}>
          Congratulations your Pizza is on your way!
        </h2>
        <CardImg
          src="https://media.giphy.com/media/3o7btXJrqLo5bbtQDm/giphy.gif"
          alt="You get a pizza!"
        />
      </Card>

    </>
  );
};

export default Final;
