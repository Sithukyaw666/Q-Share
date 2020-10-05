import React from "react";

function Post({ post, style }) {
  const { text, photoURL, displayName, date } = post;

  let dateObj = new Date(date);

  let postDate = dateObj.toLocaleString();

  return (
    <>
      <div className={style.post}>
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
      </div>
    </>
  );
}

export default Post;
