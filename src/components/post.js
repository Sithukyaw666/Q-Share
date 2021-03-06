import React from "react";
import { useState } from "react";

function Post({ post, style, auth, postRef, darkmode }) {
  const { text, photoURL, displayName, date, id, votedUser } = post;

  let dateObj = new Date(date);

  let postDate = dateObj.toLocaleString();

  const [voteduser, setvoteduser] = useState(votedUser);

  const onVote = () => {
    setvoteduser((preVote) => [...preVote, auth.currentUser.uid]);
  };
  if (voteduser.length > votedUser.length) {
    console.log("ok");
    postRef.doc(id).update({
      votedUser: voteduser,
    });
  }
  const alreadyvoteduser = voteduser.filter(
    (uid) => uid === auth.currentUser.uid
  );

  return (
    <>
      <div
        className={style.post}
        style={{
          backgroundColor: `${darkmode ? "rgba(35, 37, 70, 0.342)" : ""}`,
          color: `${darkmode ? "white" : ""}`,
        }}
      >
        <div className={style.post_header}>
          <img
            className={style.userphoto}
            alt="Profile pic"
            src={
              photoURL ||
              "https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
            }
          />
          <div>
            <p className={style.name}>{displayName}</p>
            <p className={style.post_date}>{postDate}</p>
          </div>
        </div>
        <p className={style.post_text}>{text}</p>
        <div className={style.vote_container}>
          <button
            onClick={onVote}
            className={`${style.vote_btn} ${
              alreadyvoteduser[0] ? style.voted : ""
            }`}
          >
            <i
              className={`${
                alreadyvoteduser[0] ? "fas" : "far"
              } fa-arrow-alt-circle-up`}
            ></i>
          </button>
          <p
            className={style.vote_count}
            style={{ color: `${darkmode ? "rgb(209, 208, 208)" : ""}` }}
          >
            {votedUser.length === 0 ? "" : votedUser.length}
          </p>
        </div>
      </div>
    </>
  );
}

export default Post;
