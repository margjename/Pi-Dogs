const { Dog, Temperament } = require("../../db.js");
const fetch = require("node-fetch");
const apikey = process.env.API_KEY;

const getDogsApi = async () => {
  let dogsApiUrl = await fetch(
    `https://api.thedogapi.com/v1/breeds?api_key=${apikey}`
  );
  const dogsApiJson = await dogsApiUrl.json();
  let allDogsApi = dogsApiJson.map((e) => {
    return {
      id: e.id,
      name: e.name,
      temperament: e.temperament,
      //el weight viene como una cadena de texto -> "3 - 6"
      //debo devolverlo como número
      weight_min: parseInt(e.weight.metric.slice(0, 2).trim()),
      weight_max: parseInt(e.weight.metric.slice(4).trim()),
      image: e.image.url,
      life_span: e.life_span,
      height_min: parseInt(e.height.metric.slice(0, 2).trim()),
      height_max: parseInt(e.height.metric.slice(4).trim()),
    };
  });
  return allDogsApi;
};

const getDogsDb = async function () {
  var dogsDBs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  // Hago un mapeo para ajustar la info a mis necesidades
  let formatDogsDb = dogsDBs.map((dog) => {
    let tempsString = [];
    dog.temperaments?.map((temp) => {
      tempsString.push(temp.name);
    });
    // console.log("temperamentos");
    // console.log(tempsString);
    return {
      id: dog.id,
      name: dog.name,
      temperament: tempsString.join(", "),
      weight_min: dog.weight_min,
      weight_min: dog.weight_max,
      image: dog.image,
      life_span: dog.life_span,
      height_min: dog.height_min,
      height_max: dog.height_max,
      createdInDB: dog.createdInDB,
    };
  });
  return formatDogsDb;
};

const getAllDogs = async () => {
  let dogsApi = await getDogsApi();
  let dogsDb = await getDogsDb();
  let dogsApiDb = dogsApi.concat(dogsDb);
  return dogsApiDb;
};

module.exports = { getAllDogs, getDogsDb, getDogsApi };
