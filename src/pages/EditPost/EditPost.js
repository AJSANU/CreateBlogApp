import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { initialPosts } from "../../initialPosts";
import moment from "moment";
import "./newpost-styles.css";

export default function NewPost(props) {
  const [url, setUrl] = useState(props.url);
  const [title, setTitle] = useState(props.title);
  const [postText, setPostText] = useState(props.text);
  const [tags, setTags] = useState(props.tags);
  const history = useHistory();

  function createNewPost() {
   initialPosts[props.id].url = url;
   initialPosts[props.id].title = title;
   initialPosts[props.id].postText = postText;
   initialPosts[props.id].date = moment().format("L");
   history.push("/");
   window.alert("!!! Post updated successfully !!!");
  }

  function newId() {
    let id;
    if (initialPosts.length === 0) {
      id = 1;
    } else {
      id = initialPosts[initialPosts.length - 1].id + 1;
    }
    return id;
  }


  return (
    <div id="newPostWrapper">
      <form>
        <div id="imgInput">
        <h3>Image URL...</h3>
          <label htmlFor="picture">Image</label>
          <input
            type="url"
            id="picture"
            name="picture"
            placeholder="Image URL..."
            defaultValue={props.url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div id="titleInput">
         <h3>Title of post</h3>
          <label htmlFor="title">Title of post</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Post title..."
            defaultValue={props.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div id="textBodyInput">
        <h3>Blog post</h3>
          <label htmlFor="postText">Blog post</label>
          <textarea
            id="postText"
            name="postText"
            placeholder="Write your post here..."
            defaultValue={props.text}
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <div id="tagsInput">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Tags..."
            disabled
          />
        </div>
        <button type="button" onClick={()=>{ createNewPost()}}>
          Publish
        </button>
      </form>
    </div>
  );
}
