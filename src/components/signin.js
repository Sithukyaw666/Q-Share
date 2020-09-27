import React from "react";

function SignIn({ auth, firebase, style }) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <div className={style.signin_container}>
      <h3>Sign-In with GOOGLE</h3>
      <i className={`fab fa-google ${style.google_icon}`}></i>
      <button className={style.signin_btn} onClick={signInWithGoogle}>
        <i className="fas fa-arrow-circle-right"></i>
      </button>
    </div>
  );
}
export default SignIn;
