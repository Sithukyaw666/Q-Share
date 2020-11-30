import React, { useState } from "react";
import { BoxLoading } from "react-loadingg";
import { Offline, Online } from "react-detect-offline";

import Post from "./post";
function Posts({
  useCollectionData,
  firestore,
  firebase,
  auth,
  style,
  sidebaractive,
  darkmode,
  setdarkmode,
}) {
  const postRef = firestore.collection("posts");

  const query = postRef.orderBy("createdAt", "desc").limit(25);

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
      votedUser: [],
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
        style={{
          backgroundColor: `${darkmode ? "#0D0E18" : ""}`,
          color: `${darkmode ? "white" : ""}`,
        }}
      >
        <div className={style.profile_info}>
          <img
            className={style.user_photo}
            style={{
              border: `${darkmode ? "2px solid white" : ""}`,
            }}
            src={auth.currentUser ? auth.currentUser.photoURL : ""}
            alt="profile"
          />
          <p className={style.username}>
            {auth.currentUser ? auth.currentUser.displayName : ""}
          </p>
        </div>
        <div className={style.option}>
          <button
            className={style.signout_btn}
            style={{
              border: `${darkmode ? "2px solid white" : ""}`,
              color: `${darkmode ? "white" : ""}`,
            }}
            onClick={() => auth.signOut()}
          >
            signout
          </button>
          <button
            className={style.darkmode_toggle}
            onClick={() => setdarkmode(!darkmode)}
            style={{ color: `${darkmode ? "white" : ""}` }}
          >
            <i className={`fas ${darkmode ? "fa-moon" : "fa-sun"}`}></i>
          </button>
        </div>
      </div>

      <main className={style.posts_container}>
        {posts ? (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              style={style}
              auth={auth}
              postRef={postRef}
              darkmode={darkmode}
            />
          ))
        ) : (
          <BoxLoading color="#2c64ff" size="large" />
        )}
      </main>
      <Online>
        <button
          onClick={popUp}
          className={style.popup_btn}
          style={{ display: `${toggle.active ? "none" : "block"}` }}
        >
          Share Your Thoughts
        </button>
      </Online>
      <Offline>
        <div className={style.offline_alert}>
          <p>No Network Connection</p>
        </div>
      </Offline>

      <div
        className={`${style.form_container} ${
          toggle.active ? style.active : ""
        }`}
        style={{
          backgroundColor: `${darkmode ? "#0D0E18" : ""}`,
          color: `${darkmode ? "white" : ""}`,
        }}
      >
        <button onClick={popUp} className={style.close_btn}>
          <i className="fas fa-caret-down"></i>
        </button>
        <form className={style.posts_form} onSubmit={sumbitPost}>
          {/* <img className={style.profile_photo} src={photo} alt="profile" /> */}
          <button
            onClick={popUp}
            className={style.posts_button}
            type="submit"
            disabled={!formValue}
          >
            <i className={`${formValue ? "fas" : "far"} fa-location-arrow`}></i>
          </button>
          <textarea
            className={style.posts_input}
            style={{
              backgroundColor: `${darkmode ? "#222222" : ""}`,
              color: `${darkmode ? "white" : ""}`,
            }}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Share your thoughts"
          />
        </form>
      </div>
    </>
  );
}
export default Posts;
