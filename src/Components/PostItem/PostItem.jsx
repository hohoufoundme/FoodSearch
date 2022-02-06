import axios from "axios";
import React, { useState } from "react";
import IngredientItem from "../IgredientItem/IngredientItem";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import cl from "./PostItem.module.css";

const PostItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  async function openRecipe(recipeId) {
    setIsLoading(true);
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: "c9fffcb4d44643379c2de73a14df400c",
        },
      }
    );
    setIsLoading(false);
    window.open(response.data.sourceUrl, "_blank");
  }

  return (
    <div className={cl.item} onClick={() => openRecipe(props.result.id)}>
      {isLoading ? (
        <div className={cl.loadingOverlay}>
          <LoadingAnimation />{" "}
        </div>
      ) : (
        <div></div>
      )}
      <div className={cl.leftWindow}>
        <img className={cl.foodImage} src={props.result.image} />
      </div>
      <div className={cl.rightWindow}>
        <div className={cl.title}>{props.result.title}</div>
        <div className={cl.ingredientsTitle}>Ingredients:</div>
        <div className={cl.ingredients}>
          {props.result.usedIngredients.map((i) => {
            return <IngredientItem name={i.name} isUsed={true} />;
          })}
          {props.result.missedIngredients.map((i) => {
            return <IngredientItem name={i.name} isUsed={false} />;
          })}
        </div>
        <div className={cl.matchBar}>
          <span>match</span>
          <div
            className={cl.matchBarFill}
            style={{ width: props.result.matchPercent + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
