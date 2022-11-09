import React from "react";
import Style from "./Styles.css";

export default function Card({
  image,
  name,
  temperament,
  weight_min,
  weight_max,
}) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <img src={image} alt="img not found" width="200px" height="200px" />
          {/* <p className="card-image">Image: {image}</p> */}
          <p className="card-text">Temperament: {temperament}</p>
          <br></br>
          <p className="card-text">Weight_min: {weight_min} kg</p>
          <p className="card-text">Weight_max: {weight_max} kg</p>
          <br></br>
        </div>
      </div>
    </div>
  );
}
