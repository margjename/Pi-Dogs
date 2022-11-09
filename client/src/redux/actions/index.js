import axios from "axios";

const GET_ALL_DOGS = "GET_ALL_DOGS";
const GET_DOG_DETAILS = "GET_DOG_DETAILS";
const CREATE_DOG = "CREATE_DOG";
const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
const FILTER_BY_CREATED = "FILTER_BY_CREATED";
const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";
const FILTER_DOG_BY_WEIGHT = "FILTER_DOG_BY_WEIGHT";

export const getAllDogs = () => {
  return async function (dispatch) {
    // ruta de back http://localhost:3001/dogs
    return fetch(`http://localhost:3001/dogs`)
      .then((respuesta) => respuesta.json())
      .then((dogs) => {
        dispatch({ type: GET_ALL_DOGS, payload: dogs });
      });
  };
};

export const getDogDetail = (id) => {
  return async function (dispatch) {
    // ruta de back http://localhost:3001/dogs/:id
    return fetch(`http://localhost:3001/dogs/${id}`)
      .then((respuesta) => respuesta.json())
      .then((dogDetails) => {
        dispatch({ type: GET_DOG_DETAILS, payload: dogDetails });
      });
  };
};

let id;

export const createDog = (payload) => {
  return async () => {
    try {
      const datos = await axios.post("http://localhost:3001/dogs", payload);
      return datos;
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchDog = (name) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/dogs?name=${name}`).then((respuesta) =>
      respuesta.json().then((data) => {
        dispatch({ type: GET_ALL_DOGS, payload: data });
      })
    );
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/temperaments").then((respuesta) =>
      respuesta.json().then((data) => {
        dispatch({ type: GET_TEMPERAMENTS, payload: data });
      })
    );
  };
};

export const filterDogsByCreated = (payload) => {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
};

export const filterDogsByTemperaments = (payload) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
};

export function handlesortName(payload) {
  return {
    type: "FILTER_DOG_BY_NAME",
    payload,
  };
}

export function handleSortWeight(payload) {
  return {
    type: "FILTER_DOG_BY_WEIGHT",
    payload,
  };
}
