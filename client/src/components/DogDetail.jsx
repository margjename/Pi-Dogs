import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogDetail } from "../redux/actions/index.js";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Styles.css";

export default function DetailDog() {
  const dispatch = useDispatch();
  const detallePerro = useSelector((state) => state.dogDetail);
  const { id } = useParams();

  //m: me traigo del state, me llena el state con el detalle del perro
  useEffect(() => {
    dispatch(getDogDetail(id));
  }, [id]);

  return (
    <div className="DetailDog">
      <h1 className="titulos">DOG DETAILS</h1>

      {detallePerro.length > 0 ? (
        <div className="cardDetail">
          <img
            className="imgenDetalle"
            src={detallePerro[0].image}
            alt="imagen"
          />
          <h2 className="card-title">{detallePerro[0].name}</h2>
          <p className="card-text">
            -Temperament: {/* {detallePerro[0].temperament} */}
            {!detallePerro[0].createdInDb
              ? detallePerro[0].temperament
              : detallePerro[0].temperaments.map((d) => d.name + " ")}
          </p>
          <p className="card-text">-weight_min: {detallePerro[0].weight_min}</p>
          <p className="card-text">-weight_max: {detallePerro[0].weight_max}</p>
          <p className="card-text">-Height_min: {detallePerro[0].height_min}</p>
          <p className="card-text">-Height_max: {detallePerro[0].height_max}</p>
          <p className="card-text">-Life_span: {detallePerro[0].life_span}</p>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
      <Link to="/home">
        <button className="botonVolver">Volver</button>
      </Link>
    </div>
  );
}
