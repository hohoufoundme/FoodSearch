import React from "react";
import cl from "./SearchQueryItem.module.css";

const SearchQueryItem = (props) => {
  return (
    <div className={cl.item} {...props}>
      {props.query}
      <button className={cl.closeBtn}>X</button>
    </div>
  );
};

export default SearchQueryItem;
