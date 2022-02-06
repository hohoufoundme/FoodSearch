import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "./Components/SearchInput/SearchInput";
import SearchQueryItem from "./Components/SearchQueryItem/SearchQueryItem";
import "./App.css";
import Fridge from "./img/Fridge.png";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PostList from "./Components/PostList/PostList";
import LoadingAnimation from "./Components/LoadingAnimation/LoadingAnimation";

function App() {
  const testItems = [];
  const [results, setResults] = useState([]);
  const [searchQueries, setSearchQueries] = useState([]);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function getResults() {
    let resultArr;

    if (searchQueries) {
      setIsLoading(true);
      await axios
        .get("https://api.spoonacular.com/recipes/findByIngredients", {
          params: {
            apiKey: "c9fffcb4d44643379c2de73a14df400c",
            ingredients: searchQueries.join(",+"),
            ranking: 1,
            number: 30,
          },
        })
        .then(function (response) {
          resultArr = response.data;
        })
        .catch(function (error) {
          resultArr = testItems;
        })
        .then(() => setIsLoading(false));
    }

    console.log(resultArr);

    const editedArray = resultArr.map((item) => {
      return setMatchPercent(item);
    });

    editedArray.sort((a, b) => b.matchPercent - a.matchPercent);
    setResults(editedArray);
  }

  const setMatchPercent = (resultItem) => {
    return { ...resultItem, matchPercent: getMatchPercent(resultItem) };
  };

  useEffect(() => {
    getResults();
  }, [searchQueries]);

  const addFilter = (query) => {
    if (query) {
      setSearchQueries([...searchQueries, query]);
      setCurrentSearchQuery("");
    }
  };

  const deleteFilter = (itemToDelete) => {
    setSearchQueries(searchQueries.filter((i) => i !== itemToDelete));
  };

  const getMatchPercent = (item) => {
    let totalItems =
      item.usedIngredients.length + item.missedIngredients.length;
    let percent = (item.usedIngredients.length / totalItems) * 100;
    return percent;
  };

  return (
    <div className="App">
      <div className="topLine"></div>
      <div className="body">
        <div className="searchBlock">
          <div className="searchLine">
            <SearchInput
              placeholder="apple, banana..."
              onChange={(e) => setCurrentSearchQuery(e.target.value)}
              value={currentSearchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addFilter(currentSearchQuery);
                }
              }}
            ></SearchInput>
          </div>
          <div className="searchQueryBlock">
            <TransitionGroup>
              {searchQueries.map((queryItem, index) => {
                return (
                  <CSSTransition
                    key={index}
                    timeout={500}
                    classNames="searchQuery"
                  >
                    <SearchQueryItem
                      key={index}
                      query={queryItem}
                      onClick={() => deleteFilter(queryItem)}
                    />
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
        </div>

        {results.length !== 0 ? (
          isLoading !== true ? (
            <TransitionGroup>
              <PostList list={results} />
            </TransitionGroup>
          ) : (
            <LoadingAnimation />
          )
        ) : (
          <div className="noPosts">
            <img src={Fridge} />
            <div className="noPostsText">What do you have in your fridge?</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
