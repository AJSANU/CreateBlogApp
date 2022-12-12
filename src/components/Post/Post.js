import React , { useState } from "react";
import { useHistory } from "react-router-dom";
import "./post-styles.css";
import CommentBox from "./CommentBox.js";
import CustomPopup from "../popup/CustomPopup";

export default function Post({ id, url, title, date, onDelete }) {
  const history = useHistory();
  const [likeCount, setLikeCount] = useState(50);
  const [dislikeCount, setDislikeCount] = useState(25);
  const [activeBtn, setActiveBtn] = useState("none");
  const [visibility, setVisibility] = useState(false);

  const popupCloseHandler = () => {
    setVisibility(false);
  };

  function handleClick() {
    history.push(`/post/${id}`);
  }

  function handleDelete() {
    setVisibility(true);
  }

  function onSubmit() {
    onDelete(id);
  }

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setLikeCount(likeCount + 1);
      setActiveBtn("like");
      return;
    }
 
    if (activeBtn === 'like'){
      setLikeCount(likeCount - 1);
      setActiveBtn("none");
      return;
    }
 
    if (activeBtn === "dislike") {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("like");
    }
  };

  const handleDisikeClick = () => {
    if (activeBtn === "none") {
      setDislikeCount(dislikeCount + 1);
      setActiveBtn("dislike");
      return;
    }
   
    if (activeBtn === 'dislike'){
      setDislikeCount(dislikeCount - 1);
      setActiveBtn("none");
      return;
    }
 
    if (activeBtn === "like") {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
      setActiveBtn("dislike");
    }
  };


  return (
    <li id="postAndButton">
      <div id="postPreview" onClick={handleClick}>
        <img src={url} alt="thumbnail" />
        <h2 style={{alignContent:"center",  fontFamily:"cursive" }}>{title}</h2>
        <em  style={{alignContent:"center",  fontFamily:"cursive", backgroundColor:"yellowgreen"}}>{date}</em>
      </div>
      <div className="container">
      <CommentBox />
  <div className="btn-container">
    <button
      className={`btn ${activeBtn === "like" ? "like-active" : ""}`}
      onClick={handleLikeClick}
      style={{alignContent:"center",  fontFamily:"cursive" }}
    >
      <span className="material-symbols-rounded" ></span>
      Like {likeCount}
    </button>
 
    <button
      className={`btn ${activeBtn === "dislike" ? "dislike-active" : ""}`}
      onClick={handleDisikeClick}
      style={{alignContent:"center",  fontFamily:"cursive" }}
    >
      <span className="material-symbols-rounded"></span>
      Dislike {dislikeCount}
    </button>
  </div>
</div>
{visibility &&   
      <CustomPopup
        onClose={popupCloseHandler}
        show={visibility}
        title="Delete Conformation"
      >
        <br></br><br></br>
        <div>
        <h3 style={{alignContent:"center",  fontFamily:"cursive", color:"red"}}>
          Are you sure you want to delete this post ?
        </h3>
        <br></br><br></br>
        <button
         className={"deletebutton"}
         onClick= {()=>{onSubmit(); window.alert("!!! Post deleted successfully !!!");}}
         style={{alignContent:"center",  fontFamily:"cursive", backgroundColor:"grey"  }}
        >
        <span className="material-symbols-rounded" ></span>
             Delete Post 
        </button>
        </div>
      </CustomPopup>
      }
      <span id="deleteBtn" onClick={handleDelete}>
        <img
          src="https://icons-for-free.com/iconfiles/png/512/close+closecancelsquare+cross+delete+remove+square+icon-1320185734508070818.png"
          alt="Delete post"
        />
      </span>
    </li>
  );
}
