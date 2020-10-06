import React from "react";

function Profile({ auth, style, sidebar }) {
  const photo = auth.currentUser ? auth.currentUser.photoURL : "";
  return (
    // && do the display
    auth.currentUser && (
      <div className={style.profile_container}>
        <img
          src={photo}
          className={style.profile_photo}
          alt="profile"
          onClick={sidebar}
        />
      </div>
    )
  );
}
export default Profile;
