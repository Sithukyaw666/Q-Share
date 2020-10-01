import React from "react";

function SignOut({ auth, style }) {
  return (
    // && do the display
    auth.currentUser && (
      <div className={style.profile_container}>
        <button className={style.signout_btn} onClick={() => auth.signOut()}>
          <i className="fas fa-sign-out-alt"></i>
        </button>
      </div>
    )
  );
}
export default SignOut;
