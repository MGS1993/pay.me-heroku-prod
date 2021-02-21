import React from 'react';
import styles from './SignOutBtn.module.css';


const SignOut = props => {


  return(
    <div className={styles.signOutDivWrapper}
          onClick={props.logoutHandler}>
      <p 
      className={styles.signOutText}
      >
        Sign Out</p>
    </div>
  )
}


export default SignOut