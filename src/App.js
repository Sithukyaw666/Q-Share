import React, { useState } from "react";

import style from "./style/App.module.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import logo from "./img/logo.svg";
import { useEffect } from "react";

const SignIn = React.lazy(() => import("./components/signin"));
const Profile = React.lazy(() => import("./components/profile"));
const Posts = React.lazy(() => import("./components//posts"));

firebase.initializeApp({
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: "q-keep",
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: "1:819553208499:web:2256793f60c9deabf188c6",
  measurementId: process.env.REACT_APP_MEASUREMENTID,
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const App = () => {
  const [user] = useAuthState(auth);
  const saveTheme = () => {
    return JSON.parse(localStorage.getItem("dark")) || false;
  };
  const [darkmode, setdarkmode] = useState(saveTheme);

  const [sidebaractive, setsidebar] = useState({
    active: false,
  });

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkmode));
  }, [darkmode]);

  const sidebar = () => {
    const currentState = sidebaractive.active;
    setsidebar({ active: !currentState });
  };
  return (
    <>
      <header
        className={style.navbar}
        style={{ backgroundColor: `${darkmode ? "#0D0E18" : ""}` }}
      >
        <img className={style.logo} src={logo} alt="Logo" />

        <Profile auth={auth} style={style} sidebar={sidebar} />
      </header>

      <section
        className={style.section}
        style={{
          backgroundColor: `${darkmode ? "#0D0E18" : ""}`,
          color: `${darkmode ? "white" : ""}`,
        }}
      >
        {user ? (
          <Posts
            useCollectionData={useCollectionData}
            firestore={firestore}
            auth={auth}
            firebase={firebase}
            style={style}
            sidebaractive={sidebaractive}
            darkmode={darkmode}
            setdarkmode={setdarkmode}
          />
        ) : (
          <SignIn
            auth={auth}
            firebase={firebase}
            style={style}
            darkmode={darkmode}
          />
        )}
      </section>
    </>
  );
};

export default App;
