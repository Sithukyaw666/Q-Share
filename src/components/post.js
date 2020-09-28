import React from "react";

function Post({ post, auth, style }) {
  const { text, photoURL, displayName } = post;

  //   const postCla = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={style.post}>
        <div className={style.post_header}>
          <img className={style.userphoto} alt="Profile pic" src={photoURL} />
          <p className={style.name}>{displayName}</p>
        </div>
        <p className={style.post_text}>{text}</p>
      </div>
    </>
  );
}

export default Post;
