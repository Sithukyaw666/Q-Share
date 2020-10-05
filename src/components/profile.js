import React from "react";

function Profile({ auth, style, sidebaractive, setsidebar }) {
  const sidebar = () => {
    const currentState = sidebaractive.active;
    setsidebar({ active: !currentState });
  };
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

        {/* <button className={style.signout_btn} onClick={() => auth.signOut()}>
          <i className="fas fa-sign-out-alt"></i>
        </button> */}
      </div>
    )
  );
}
export default Profile;
