import React, { useEffect } from "react";

// Importar las actions
import { createDog } from "../redux/actions/index.js";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getTemperaments } from "../redux/actions/index.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//____________________COMPONENTE____________________

const CreateDog = () => {
  const temp = useSelector((state) => state.temperament);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleSeletChange = (e) => {
    //para que no me agregue 2 veces el temperamento
    if (!input.temperaments.includes(e.target.value))
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      });
  };

  function handleChange(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  }

  const handleSubmit = (e) => {
    if (
      !input.name ||
      !input.height_min ||
      !input.height_max ||
      !input.weight_min ||
      !input.weight_max ||
      !input.life_span ||
      input.life_span > "20" ||
      !input.image
    ) {
      e.preventDefault();
      return alert("Complete the mandatory data to continue");
    } else if (!input.temperaments.length) {
      e.preventDefault();
      return alert("Temperament required");
    } else {
      // if (input.length > 0) {
      //e.preventDefault();
      dispatch(createDog(input));
      alert("Dog Created");
      setInput({
        name: "",
        height_min: "",
        height_max: "",
        weight_min: "",
        weight_max: "",
        life_span: "",
        image: "",
        temperaments: [],
      });
      // } else {
      //   alert("Complete the form");
      // }
      history.push("/home");
    }
  };

  //validaciones
  const regexUrl =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Name requerido";
    }
    if (
      input.name.includes("1") ||
      input.name.includes("2") ||
      input.name.includes("3") ||
      input.name.includes("4") ||
      input.name.includes("5") ||
      input.name.includes("6") ||
      input.name.includes("7") ||
      input.name.includes("8") ||
      input.name.includes("9") ||
      input.name.includes("0")
    ) {
      errors.name = "Name invalid";
    }
    if (input.name.charAt(0) === " ") {
      errors.name = "Name invalid";
    }
    if (!input.height_min) {
      errors.height_min = "height_min required";
    }
    if (!input.weight_min) {
      errors.weight_min = "weight_min required";
    }
    if (!input.height_max) {
      errors.height_max = "height_max required";
    }
    if (!input.weight_max) {
      errors.weight_max = "weight_max required";
    }
    if (!input.life_span || input.life_span > "20") {
      errors.life_span = "life_span required";
    }
    if (!input.image) {
      errors.image = "image required";
    }
    if (input.image && !regexUrl.test(input.image)) {
      errors.image = "the image must be a url";
    }
    // if (input.temperament.length < 0) {
    //   errors.temperament = "temperamento requerido";
    // }

    return errors;
  }

  return (
    <div className="containerCreate">
      <div className="titulos">CREATE DOG</div>
      <div className="container-form">
        <form className="formulario" onSubmit={handleSubmit}>
          <label className="label">Name: </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={input.name}
          ></input>
          {errors.name && <p className="error"> {errors.name}</p>}

          <label className="label">height_min: </label>
          <input
            type="text"
            name="height_min"
            onChange={handleChange}
            value={input.height_min}
          ></input>
          {errors.height_min && <p className="error"> {errors.height_min}</p>}

          <label className="label">height_max: </label>
          <input
            type="text"
            name="height_max"
            onChange={handleChange}
            value={input.height_max}
          ></input>
          {errors.height_max && <p className="error"> {errors.height_max}</p>}

          <label className="label">weight_min: </label>
          <input
            type="text"
            name="weight_min"
            onChange={handleChange}
            value={input.weight_min}
          ></input>
          {errors.weight_min && <p className="error"> {errors.weight_min}</p>}

          <label className="label">weight_max: </label>
          <input
            type="text"
            name="weight_max"
            onChange={handleChange}
            value={input.weight_max}
          ></input>
          {errors.weight_max && <p className="error"> {errors.weight_max}</p>}

          <label className="label">life_span: </label>
          <input
            type="text"
            name="life_span"
            onChange={handleChange}
            value={input.life_span}
          ></input>
          {errors.life_span && <p className="error"> {errors.life_span}</p>}

          <label className="label">image: </label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={input.image}
          ></input>
          {errors.image && <p className="error"> {errors.image}</p>}

          <label className="label">temperamentos</label>
          <select onChange={handleSeletChange}>
            <option value="">Seleccionar</option>
            {temp.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <div className="temps-list-container">
            {input.temperaments.map((el) => (
              <div className="temp-item" key={el}>
                {el}
              </div>
            ))}
          </div>
          <br></br>
          <button className="botonBuscador" type="submit">
            Create Dog
          </button>
        </form>
      </div>
      <Link to="/home">
        <button className="botonVolver">Volver</button>
      </Link>
    </div>
  );
};
export default CreateDog;
