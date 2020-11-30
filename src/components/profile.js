import React from "react";

function Profile({ auth, style, sidebar, darkmode }) {
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
          style={{
            border: `${darkmode ? "2px solid white" : ""}`,
          }}
        />
      </div>
    )
  );
}
export default Profile;
