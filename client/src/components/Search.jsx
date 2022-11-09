import React, { useState } from "react";
import { searchDog } from "../redux/actions/index";
import { useDispatch } from "react-redux";

export default function Search({ currentPage }) {
  const dispatch = useDispatch();
  const [input, setinput] = useState("");

  const handleChange = (e) => {
    setinput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      dispatch(searchDog(input));
      setinput("");
      currentPage(1);
    } else {
      alert("Enter a valid name");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="searchInput"
          type="text"
          value={input}
          onChange={handleChange}
        />
        <button className="botonBuscador" type="submit">
          Search a Dog
        </button>
      </form>
    </div>
  );
}
