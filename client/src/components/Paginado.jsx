import "./Styles.css";
import React from "react";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="Nav paginado">
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="listaPaginado">
              {/* se va a renderizar una lista: el number va a ser cada una de las paginas que yo necesito para renderizar todos los perros, que se guardan en el array pageNumbers */}
              <a onClick={() => paginado(number)}>{number}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
}
