import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import "./styles.css";
import { initialPosts } from "./initialPosts";
import Homes from "./pages/Home/Home";
import PostDetails from "./pages/PostDetails/PostDetails";
import NewPost from "./pages/NewPost/NewPost";
import AppBar from '@material-ui/core/AppBar';
import EditPost from "./pages/EditPost/EditPost"
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';

export default function App() {
  const [posts, setPosts] = useState(initialPosts);

  const history = useHistory();

  function onDelete(deleteId) {
    let searchBar = document.getElementById("searchInput");
    if (searchBar.innerText.trim() !== "") {
      let text = searchBar.innerText;
      searchBar.innerText = text;
    }

    for (let i = initialPosts.length - 1; i >= 0; --i) {
      if (initialPosts[i].id === deleteId) {
        initialPosts.splice(i, 1);
        break;
      }
    }
    history.push("/");
  }

  return (
    <div className="App">

       <div>
          <AppBar color="primary" position="static">
            <h1>
              My Blogs
            </h1>
        </AppBar>
      </div>

      <main>
      <Nav initialPosts={initialPosts} posts={posts} setPosts={setPosts}/>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Homes posts={posts} setPosts={setPosts} handleDelete={onDelete} />
            )}
          />
          <Route path="/post/:id" component={PostDetails} />
          <Route path="/newpost" component={NewPost} />
        </Switch>
      </main>
    </div>
  );
}
