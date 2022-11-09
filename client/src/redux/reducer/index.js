const initialState = {
  allDogs: [],
  allDogsB: [],
  dogDetail: [],
  temperament: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DOGS": {
      return {
        ...state,
        allDogs: action.payload, //en el estado allDogs, manda todo lo que llegue del llamado a la función
        allDogsB: action.payload,
      };
    }
    case "GET_DOG_DETAILS":
      return {
        ...state,
        dogDetail: action.payload, //en el estado de dogDetail, manda todo lo que llegue del llamado a la función
      };
    case "CREATE_DOG":
      return {
        ...state,
        allDogs: [...state.allDogs, action.payload],
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperament: action.payload,
      };
    case "FILTER_BY_CREATED":
      const filterDogsCreated =
        action.payload === "createdInDB"
          ? state.allDogsB.filter((e) => e.createdInDB)
          : state.allDogsB.filter((e) => !e.createdInDB);
      return {
        ...state,
        allDogs: action.payload === "All" ? state.allDogsB : filterDogsCreated,
      };

    case "FILTER_BY_TEMPERAMENT":
      const filterDogs = state.allDogsB;
      const filterDogsTemperament = filterDogs?.filter((dog) => {
        console.log(dog.temperament);
        if (dog.temperament !== undefined) {
          console.log(dog.temperament);
          return dog.temperament.includes(action.payload);
        }
      });
      return {
        ...state,
        allDogs: filterDogsTemperament,
      };
    case "FILTER_DOG_BY_NAME":
      const allDogsByName = state.allDogsB;
      const orderAllDogsByName =
        action.payload === "asc"
          ? allDogsByName.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : allDogsByName.sort((a, b) => {
              if (a.name < b.name) return 1;
              if (a.name > b.name) return -1;
              return 0;
            });
      return {
        ...state,
        allDogs: action.payload === "All" ? state.allDogsB : orderAllDogsByName,
      };

    case "FILTER_DOG_BY_WEIGHT":
      const filterDogsByWeight = state.allDogsB;
      let filterWeight =
        action.payload === "weightMin"
          ? filterDogsByWeight.sort((a, b) => {
              if (parseInt(a.weight_min) > parseInt(b.weigh_min)) return 1;
              if (parseInt(a.weight_min) < parseInt(b.weight_min)) return -1;
              return 0;
            })
          : filterDogsByWeight.sort((a, b) => {
              if (parseInt(a.weight_min) < parseInt(b.weight_min)) return 1;
              if (parseInt(a.weight_min) > parseInt(b.weight_min)) return -1;
              return 0;
            });
      return {
        ...state,
        allDogs: filterWeight,
      };
    default:
      return state;
  }
};

export default rootReducer;
