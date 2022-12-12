import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./nav-styles.css";

export default function Nav({ initialPosts, posts, setPosts }) {
  const [search, setSearch] = useState("");
  const history = useHistory();

  function filterPosts(searchTerm) {
    if (searchTerm.trim() === "") {
      setPosts(initialPosts);
    } else {
      const filteredPosts = posts.filter(
        (x) =>
          x.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          x.tags.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setPosts(filteredPosts);
    }
  }

  useEffect(() => {
    filterPosts(search);
  }, [search]);

  function resetSearchbar() {
    let searchBar = document.getElementById("searchInput");
    searchBar.value = null;
    setSearch("");
  }

  function readyToSearch() {
    history.push("/");
  }

  return (
    <nav style={{ backgroundColor:"black"}}>
      <div>
        <img style={{ backgroundColor: "#f9f9f9"}}
          src="https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png"
          alt=""
        />
        <ul>
          <li>
            <Link className="navbar" onClick={resetSearchbar} to="/" style={{alignContent:"center",  fontFamily:"cursive" }}>
              Home
            </Link>
          </li>
          <li>
            <Link className="navbar" onClick={resetSearchbar} to="/newpost" style={{alignContent:"center",  fontFamily:"cursive" }}>
              New post
            </Link>
          </li>
          <li>
            <label htmlFor="search" style={{alignContent:"center",  fontFamily:"cursive" }}>Search for post:</label>
            <h3 style={{alignContent:"center",  fontFamily:"cursive" }}>Search for post: </h3>
            <input
              id="searchInput"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              onClick={readyToSearch}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
