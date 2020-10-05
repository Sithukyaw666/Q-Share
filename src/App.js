import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import SignIn from "./components/signin";
import Profile from "./components/profile";
import Posts from "./components/posts";

import style from "./style/App.module.css";
firebase.initializeApp({
  apiKey: "AIzaSyAYN0TleCAPyGy3Xu2JzmgyVR-RZg70GTI",
  authDomain: "q-keep.firebaseapp.com",
  databaseURL: "https://q-keep.firebaseio.com",
  projectId: "q-keep",
  storageBucket: "q-keep.appspot.com",
  messagingSenderId: "819553208499",
  appId: "1:819553208499:web:2256793f60c9deabf188c6",
  measurementId: "G-WY8NTJCNGT",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const App = () => {
  const [user] = useAuthState(auth);
  const [sidebaractive, setsidebar] = useState({
    active: false,
  });

  return (
    <>
      <header className={style.navbar}>
        <h1 className={style.logo}>Q-SHARE</h1>

        <Profile
          auth={auth}
          style={style}
          sidebaractive={sidebaractive}
          setsidebar={setsidebar}
        />
      </header>

      <section className={style.section}>
        {user ? (
          <Posts
            useCollectionData={useCollectionData}
            firestore={firestore}
            auth={auth}
            firebase={firebase}
            style={style}
            sidebaractive={sidebaractive}
          />
        ) : (
          <SignIn auth={auth} firebase={firebase} style={style} />
        )}
      </section>
    </>
  );
};

export default App;
