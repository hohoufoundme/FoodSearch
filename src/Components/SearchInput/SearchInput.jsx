import React from "react";
import cl from "./SearchInput.module.css";

const SearchInput = (props) => {
  return (
    <div>
      <input className={cl.input} {...props} />
    </div>
  );
};

export default SearchInput;
