import React, { useEffect, useState } from "react";
import "./SearchBar.scss";
import { Search, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../../../gql/user";
import { size } from "lodash";
import ImageNotFound from "../../../assets/avatar.png";

function SearchBar() {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);
  const { data, loading } = useQuery(SEARCH_USERS, {
    variables: {
      search,
    },
  });

  useEffect(() => {
    if (size(data?.searchUsers) > 0) {
      const users = [];

      data.searchUsers.forEach((user, index) => {
        users.push({
          key: index,
          username: user.username,
          avatar: user.avatar,
          title: user.name,
        });
      });
      setResults(users);
      //   console.log(results);
    } else {
      setResults([]);
    }
  }, [data]);

  const onChange = (e) => {
    if (e.target.value) setSearch(e.target.value);
    else setSearch(null);
  };

  const handlerResultSelect = () =>{
      setSearch(null);
      setResults([]);

  }
  return (
    <Search
      className="search-users"
      placeholder="Search"
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      loading={loading}
      value={search || ""}
      onSearchChange={onChange}
      onResultSelect={handlerResultSelect}
      results={results}
      resultRenderer={(e) => <ResultSearch data={e} />}
    />
  );
}

function ResultSearch(props) {
  const { data } = props;
//   console.log(data);
  return (
    <Link className="search-users__item" to={`/${data.username}`}>
      <Image src={data.avatar || ImageNotFound} />
      <div>
        <p>{data.title}</p>
        <p>{data.username}</p>
      </div>
    </Link>
  );
}

export default SearchBar;
