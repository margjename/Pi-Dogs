import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  filterDogsByCreated,
  // orderByName,
  getTemperaments,
  filterDogsByTemperaments,
  handleSortWeight,
  handlesortName,
} from "../redux/actions/index";
import Card from "./Card";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import Paginado from "./Paginado";
import Search from "./Search";
import Style from "./Styles.css";

export default function Home() {
  //m: me creo la const dispatch para usar esa constante para despachar las acciones
  const dispatch = useDispatch();
  //m: me declaro una constante que traiga todo el estado de allDogs //MapStatetoProps
  const allDogs = useSelector((state) => state.allDogs);

  //m: me traigo del state, me llena el state con los perros cuando el componente se monta //MapDispacthtoProps
  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  //___________________________ PAGINADO _____________________________

  // Guardo en un estado local la página actual y lo empiezo en 1 porque siempre arranco en la primera página... mi state inicial va a ser 1
  const [currentPage, setCurrentPage] = useState(1);
  //Guardo cuantos dogs quiero por página, inicialmente van a ser 8
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  //El paginado va a setear la página en el número que yo vaya apretando y cuando se setee la pagina cada uno de los indices van cambiando y el slice se va a ir modificando
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  //______________________ HASTA ACÁ PAGINADO _______________________________

  //_______________________FILTROS______________________________

  const temp = useSelector((state) => state.temperament);

  //__FILTRO POR CREATED DOG____
  function handleFilterDogsCreated(e) {
    dispatch(filterDogsByCreated(e.target.value));
  }

  //__FILTRO POR ORDEN AZ____

  const [order, setOrder] = useState(allDogs);

  const [dogsOrderByName, setDogsOrderByName] = useState(allDogs);

  useEffect(() => {
    setDogsOrderByName(allDogs);
  }, [allDogs]);

  const handleSortNamee = (e) => {
    e.preventDefault();
    dispatch(handlesortName(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  };

  //__FILTRO POR PESO____
  const [dogsOrderDatos, setDogsOrderDatos] = useState(allDogs);
  //const [orderDatos, setOrderDatos] = useState("desc");

  useEffect(() => {
    setDogsOrderDatos(allDogs);
  }, [allDogs]);

  function handleSortWeightt(e) {
    e.preventDefault();
    dispatch(handleSortWeight(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
  }

  //FILTRO TEMPRERAMENTOS
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleFilterDogsTemperaments(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperaments(e.target.value));
    setCurrentPage(1);
  }

  return (
    <div>
      <div className="titulos">DOG LOVERS</div>
      <div>
        <div className="containerNav">
          <Link to="/createdog">
            <button className="botonCreateDog">
              Click Here To Create a Dog
            </button>
          </Link>
          <Search currentPage={() => setCurrentPage(1)} />
          <div>
            <select
              defaultValue="ord"
              className="select"
              onChange={(e) => handleSortNamee(e)}
            >
              <option value="ord" hidden>
                Order By Name
              </option>
              <option value="asc"> A-Z</option>
              <option value="desc"> Z-A</option>
            </select>

            <select
              className="select"
              defaultValue="weight"
              onChange={(e) => handleSortWeightt(e)}
            >
              <option value="weight" hidden>
                Filter by weight
              </option>
              <option value="weightMin">Min</option>
              <option value="weightMax">Max</option>
            </select>

            <select
              defaultValue="CREATED"
              className="select"
              onChange={(e) => handleFilterDogsCreated(e)}
            >
              <option value="CREATED" hidden>
                Filter by create
              </option>
              <option value="All"> All Dogs</option>
              <option value="createdInDB"> Created Dogs</option>
              <option value="Api"> Api Dogs</option>
            </select>

            <select
              defaultValue="All"
              className="select"
              onChange={(e) => handleFilterDogsTemperaments(e)}
            >
              <option value="All">Filter by temperament</option>
              {temp.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <NavBar /> */}
        <br></br>
        <br></br>
        <Paginado
          // le paso las props al componente:
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        <br></br>
        <br></br>
        <br></br>
      </div>
      <div className="cardsHome">
        {currentDogs?.map((el) => {
          return (
            <div className="seccion">
              <Link to={"/dog/" + el.id}>
                <Card
                  key={el.id}
                  name={el.name}
                  image={el.image}
                  temperament={el.temperament}
                  weight_min={el.weight_min}
                  weight_max={el.weight_max}
                />
              </Link>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
}
