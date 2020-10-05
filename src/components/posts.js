import React, { useState } from "react";

import Post from "./post";
function Posts({
  useCollectionData,
  firestore,
  firebase,
  auth,
  style,
  sidebaractive,
}) {
  const postRef = firestore.collection("posts");

  const query = postRef.orderBy("createdAt").limit(25);

  const [posts] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const [toggle, setToggle] = useState({ active: false });

  const sumbitPost = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await postRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
      date: Date.now(),
    });

    setFormValue("");
  };

  const popUp = () => {
    const currentState = toggle.active;

    setToggle({ active: !currentState });
  };

  return (
    <>
      <div
        className={`${style.sidebar_normal} ${
          sidebaractive.active ? style.sidebar_active : ""
        }`}
      >
        <img
          className={style.user_photo}
          src={auth.currentUser ? auth.currentUser.photoURL : ""}
          alt="profile"
        />
        <p className={style.username}>
          {auth.currentUser ? auth.currentUser.displayName : ""}
        </p>
        <button className={style.signout_btn} onClick={() => auth.signOut()}>
          signout
        </button>
      </div>
      <main className={style.posts_container}>
        {posts &&
          posts.map((post) => <Post key={post.id} post={post} style={style} />)}
      </main>
      <button
        onClick={popUp}
        className={style.popup_btn}
        style={{ display: `${toggle.active ? "none" : "block"}` }}
      >
        share your thoughts
      </button>

      <div
        className={`${style.form_container} ${
          toggle.active ? style.active : ""
        }`}
      >
        <button onClick={popUp} className={style.close_btn}>
          <i className="fas fa-caret-down"></i>
        </button>
        <form className={style.posts_form} onSubmit={sumbitPost}>
          {/* <img className={style.profile_photo} src={photo} alt="profile" /> */}
          <button
            className={style.posts_button}
            type="submit"
            disabled={!formValue}
          >
            post
          </button>
          <textarea
            className={style.posts_input}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}
export default Posts;
