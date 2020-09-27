import React from "react";

function SignOut({ auth, style }) {
  let photo = "";
  if (auth.currentUser) {
    const { photoURL } = auth.currentUser;
    photo = photoURL;
  }
  return (
    // && do the display
    auth.currentUser && (
      <div className={style.container}>
        <img className={style.profile_photo} src={photo} alt="profile" />
        <button className={style.signout_btn} onClick={() => auth.signOut()}>
          Sign Out{" "}
        </button>
      </div>
    )
  );
}
export default SignOut;
