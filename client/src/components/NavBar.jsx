// import React from "react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   filterDogsByCreated,
//   orderByName,
//   // orderByPeso,
//   getTemperaments,
//   filterDogsByTemperaments,
//   handleSortWeight,
// } from "../redux/actions/index";
// import Search from "./Search";
// import { Link } from "react-router-dom";

// export default function NavBar() {
//   const dispatch = useDispatch();
//   //m: me declaro una constante que traiga todo el estado de allDogs //MapStatetoProps
//   const allDogs = useSelector((state) => state.allDogs);
//   const temp = useSelector((state) => state.temperament);

//   //__FILTRO POR CREATED DOG____
//   function handleFilterDogsCreated(e) {
//     dispatch(filterDogsByCreated(e.target.value));
//   }

//   //__FILTRO POR CREATED AZ____
//   const [dogsOrder, setDogsOrder] = useState(allDogs);
//   const [order, setOrder] = useState("desc");

//   useEffect(() => {
//     setDogsOrder(allDogs);
//   }, [allDogs]);

//   const handleOrder = () => {
//     if (order === "desc") {
//       setOrder("asc");
//       dispatch(orderByName(dogsOrder, "asc"));
//     } else {
//       setOrder("desc");
//       dispatch(orderByName(dogsOrder, "desc"));
//     }
//   };

//   //__FILTRO POR PESO____
//   const [dogsOrderDatos, setDogsOrderDatos] = useState(allDogs);
//   const [orderDatos, setOrderDatos] = useState("desc");

//   useEffect(() => {
//     setDogsOrderDatos(allDogs);
//   }, [allDogs]);

//   function handleSortWeightt(e) {
//     e.preventDefault();
//     dispatch(handleSortWeight(e.target.value));
//     //setCurrentPage(1);
//     setOrder(e.target.value);
//   }

//   //FILTRO TEMPRERAMENTOS
//   useEffect(() => {
//     dispatch(getTemperaments());
//   }, [dispatch]);

//   function handleFilterDogsTemperaments(e) {
//     e.preventDefault();
//     dispatch(filterDogsByTemperaments(e.target.value));
//   }

//   return (
//     <div className="containerNav">
//       <Link to="/createdog"> CLik Here To Ceate a Dog</Link>
//       <Search />
//       <div>
//         <select defaultValue="ord" className="select" onChange={handleOrder}>
//           <option value="ord" hidden>
//             Order By Name
//           </option>
//           <option value="asc"> Z-A</option>
//           <option value="desc"> A-Z</option>
//         </select>

//         <select
//           className="select"
//           defaultValue="weight"
//           onChange={(e) => handleSortWeightt(e)}
//         >
//           <option value="weight" hidden>
//             Filter by weight
//           </option>
//           <option value="weightMin">Min</option>
//           <option value="weightMax">Max</option>
//         </select>

//         <select
//           defaultValue="CREATED"
//           className="select"
//           onChange={(e) => handleFilterDogsCreated(e)}
//         >
//           <option value="CREATED" hidden>
//             Filter by create
//           </option>
//           <option value="All"> All Dogs</option>
//           <option value="createdInDB"> Created Dogs</option>
//           <option value="Api"> Api Dogs</option>
//         </select>

//         <select
//           defaultValue="All"
//           className="select"
//           onChange={(e) => handleFilterDogsTemperaments(e)}
//         >
//           <option value="All">Filter by temperament</option>
//           {temp.map((t) => (
//             <option key={t.id} value={t.name}>
//               {t.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }
