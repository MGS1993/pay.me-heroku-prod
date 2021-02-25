import React, { useState, useEffect } from 'react';
import RegisterLogin from '../Forms/RegisterLogin/RegisterLogin';
import InputForm from '../Forms/InputForm/InputForm';
import SignOutBtn from '../Forms/SignOutBtn/SignOutBtn';
import styles from './HomePage.module.css';

const HomePage = props => {
  // const [confirmMsgStyle, setConfirmMsgStyle] = useState({})

  
 


  const [loggedIn, setLoggedIn] = useState(false)
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState('')
  // eslint-disable-next-line
  const [currentUserID, setCurrentUserID] = useState('')
  useEffect(()=> {
    loggedInChecker()
  })

  let rendered = null
  
  const loggedInChecker = () => {
      const loggedInUser = localStorage.getItem('user');
      const loggedInUserID = localStorage.getItem('userID');
      if (loggedInUser && loggedIn === false) {
        setLoggedIn(true);
        setCurrentUser(loggedInUser);
        setCurrentUserID(loggedInUserID);
      } 
    }
   const handleLogout = () => {
      setCurrentUser("");
      setCurrentUserID("");
      localStorage.clear()
      window.location.reload();
    }

  if(loggedIn === false) {
    rendered = 
    <div className={styles.hpWrapper}>
    <div className={styles.header}>
      <h1>Pay.Me</h1>
    </div>
    <div className={styles.hpInputWrapper}>
      <RegisterLogin
      loginHandler = {setLoggedIn} />
    </div>
  </div>
    
  } else {
    rendered = 
    <div className={styles.hpWrapper}>
    <div className={styles.header}>
      <h1>Pay.Me</h1>
      
    </div>
    <div className={styles.hpInputWrapper}>
      <SignOutBtn
        logoutHandler = {handleLogout} />
        
      <InputForm />
    </div>
  </div>
  }
  ///FIND A WAY TO RENDER THAT FUCKING TEXT ON CLICK.
  ///MAYBE LOOK UP HOW TO PASS A FUNCTION FROM CHILD TO PARENT OR SOMETHING
  ///THIS IS BULLSHIT
  return(
    rendered
  )
}



export default HomePage