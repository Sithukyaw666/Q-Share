import React, { useRef, useState } from "react";

import Post from "./post";
function Posts({ useCollectionData, firestore, firebase, auth, style }) {
  const scroll = useRef();
  const postRef = firestore.collection("posts");
  const query = postRef.orderBy("createdAt").limit(25);

  const [posts] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sumbitPost = async (e) => {
    e.preventDefault();

    const { uid, photoURL, displayName } = auth.currentUser;

    await postRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
    });

    setFormValue("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className={style.posts_container}>
        {posts &&
          posts.map((msg) => (
            <Post key={msg.id} message={msg} auth={auth} style={style} />
          ))}

        <span ref={scroll}></span>
      </main>

      <form className={style.posts_form} onSubmit={sumbitPost}>
        <input
          className={style.posts_input}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="share your thoughts"
        />

        <button
          className={style.posts_button}
          type="submit"
          disabled={!formValue}
        >
          POST
        </button>
      </form>
    </>
  );
}
export default Posts;
