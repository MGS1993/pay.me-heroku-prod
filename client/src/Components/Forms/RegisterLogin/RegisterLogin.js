import React, { useState, useEffect } from "react";
import Input from "../../Input/Input";
import styles from "./RegisterLogin.module.css";

const RegisterLogin = (props) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [applyRegister, setApplyRegister] = useState(false);
  const [registerUserName, setRegisterUserName] = useState("");
  const [registerPassWord1, setRegisterPassWord1] = useState("");
  const [registerPassWord2, setRegisterPassWord2] = useState("");
  const [userEmail, setUserEmail] = useState("");
  let rendered = null;
  let notMatchingStyle = null;
  
  
  const handleLogin = async e => {
    try {
        e.preventDefault();
        let dataBody = {
          userName: userName,
          passWord: passWord,
        }
        const response = await fetch('api/login', {
          method: 'POST',
          body: JSON.stringify(dataBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        // console.log(data)
        if(response.status === 200) {
          localStorage.setItem('user', data.user.userName)
          localStorage.setItem('userID', data.user._id)
          localStorage.setItem('userEmail', data.user.email)
          props.loginHandler()
        } 
        
      }catch(err) {
        console.log(err)
      }
  };
  const handleRegister = e => {
    e.preventDefault();
    let dataBody = {
      userName: registerUserName,
      passWord: registerPassWord1,
      passWordCheck: registerPassWord2,
      email: userEmail
    }
    fetch('api/create-user', {
      method: 'POST',
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setApplyRegister(false)
    setRegisterUserName('');
    setRegisterPassWord1('');
    setRegisterPassWord2('');
    setUserEmail('');
  }
  if(registerPassWord2 !== registerPassWord1 ) {
    notMatchingStyle = { 
      border: '1px solid red',
    }
  }
  if(applyRegister === false) {
        rendered = (
        <React.Fragment>
        <h3>Please Login In</h3>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.labelWrapper}>
            <label>
              <div>User Name</div>
              <Input
                className={styles.input}
                type="text"
                name="userName"
                value={userName}
                changed={(e) => setUserName(e.target.value)}
              />
            </label>
          </div>

          <div className={styles.labelWrapper}>
            <label>
              <div>PassWord</div>
              <Input
                inputType="password"
                className={styles.input}
                value={passWord}
                changed={(e) => setPassWord(e.target.value)}
              />
            </label>
          </div>
          <input type="submit" value="Log In" className={styles.submitBtn} />
          <div className={styles.labelWrapper}>
            <button
              className={styles.submitBtn}
              onClick={(e) => setApplyRegister(true)}
            >
              Register
            </button>
          </div>
        </form>
      </React.Fragment>
      )
  } else {
      rendered = (
          <React.Fragment>
              <h3>Register</h3>
              <form className={styles.form} onSubmit={handleRegister}>
              <div className={styles.labelWrapper}>
              
              <label>
                <div>
                User Name
                </div>
  
                <Input
                className={styles.input} 
                type="text" name="userName" 
                value={registerUserName}
                changed={e => setRegisterUserName(e.target.value)} 
                />
              </label>
            </div>
            <div className={styles.labelWrapper}>
              <label>
                <div> 
                  PassWord
                </div>
  
                <Input inputType="password" name="passWord"
                style={notMatchingStyle}
                className={styles.input} 
                value={registerPassWord1}
                changed={e => setRegisterPassWord1(e.target.value)} 
                />
              </label>
            </div>
            <div className={styles.labelWrapper}>
              <label>
                <div> 
                  re-enter password
                </div>
  
                <Input inputType="password" name="passWord"
                style={notMatchingStyle}
                className={styles.input} 
                value={registerPassWord2}
                changed={e => setRegisterPassWord2(e.target.value)} 
                />
              </label>
            </div>
            <div className={styles.labelWrapper}>
              <label>
                <div> 
                  Email
                </div>
  
                <Input inputType="text" name="email"
                className={styles.input} 
                value={userEmail}
                changed={e => setUserEmail(e.target.value)} 
                />
              </label>
            </div>
            <input
             type="submit" 
             value="Sign Up"
             className={styles.submitBtn} />
             <div className={styles.labelWrapper}>
               <button 
               className={styles.submitBtn}
               onClick={e => e.preventDefault() + setApplyRegister(false)}>
                 cancel
                 </button>
             </div>
              </form>
          </React.Fragment>
      )
  }
  return (
    <div className={styles.modalWrapper} style={props.style}>
      {rendered}
    </div>
  );
};

export default RegisterLogin;
