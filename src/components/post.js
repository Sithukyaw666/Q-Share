import React from "react";

function Post({ message, auth, style }) {
  const { text, photoURL, displayName } = message;

  //   const postCla = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={style.post}>
        <div className={style.post_header}>
          <img
            className={style.userphoto}
            alt="Profile pic"
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
          />
          <p>{displayName}</p>
        </div>
        <p>{text}</p>
      </div>
    </>
  );
}

export default Post;
