import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import { initialPosts } from "../../initialPosts";
import EditPost from "../EditPost/EditPost"
import { Link, useHistory } from "react-router-dom";
import "./postdetails-styles.css";
import CustomPopup from "../../components/popup/CustomPopup";

export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [edit, setEdit] = useState(false);
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = () => {
    setVisibility(false);
  };

  let { id } = useParams();

  const editposts = () => {
     setVisibility(true);
     console.log("test");
  };

  useEffect(() => {
    const viewPost = initialPosts.find((post) => post.id === parseInt(id, 10));
    setPost(viewPost);
  }, [id]);



  return post ? (
    <div id="viewPostWrapper">
       <Link className="navbar" onClick= {editposts} style={{alignContent:"center",  fontFamily:"cursive" }}>
              Edit post
        </Link>
      <h2 style={{alignContent:"center",  fontFamily:"cursive", color:"black"}}>{post.title}</h2>
      <em style={{alignContent:"center",  fontFamily:"cursive", color:"black"}}>{post.date} </em>
      <div>
        <br/>
      <img src={post.url} alt="thumbnail"/>
        <br/>
      </div>
      <p style={{alignContent:"center",  fontFamily:"cursive", color:"black"}}>{post.postText}</p>

      {visibility &&   
      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
        title="Edit Post"
        style= {{width:"200", length:"200"}}
      >
        <EditPost id={post.id} title={post.title} text={post.postText} url={post.url} date={post.date} tags={post.tags} />
      </CustomPopup>
      }
    </div>
  ) : null;
}
