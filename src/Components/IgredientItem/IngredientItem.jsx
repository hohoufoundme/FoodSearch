import React from "react";
import cl from "./IngredientItem.module.css";

const IngredientItem = (props) => {
  return (
    <div>
      <div className={props.isUsed === true ? cl.item : cl.item_red}>
        {props.name}
      </div>
    </div>
  );
};

export default IngredientItem;
