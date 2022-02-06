import axios from "axios";
import React from "react";
import { CSSTransition } from "react-transition-group";
import PostItem from "../PostItem/PostItem";
import cl from "./PostList.module.css";

const PostList = (props) => {
  return (
    <div className={cl.postList}>
      {props.list.map((result, index) => {
        return (
          <CSSTransition key={index} timeout={500} className="postItem">
            <PostItem key={result.id} result={result} />
          </CSSTransition>
        );
      })}
    </div>
  );
};

export default PostList;
