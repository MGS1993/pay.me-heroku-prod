import React from 'react';
import styles from './Input.module.css';

const Input = props => {

  return(
    <div className={styles.labelWrapper}>
      <label>
        <div>
          {props.labelName}
        </div>
      </label>
      <input
      type={props.inputType}
      name={props.inputName}
      style={props.style}
      value={props.value}
      onChange={props.changed}
      onClick={props.clicked}
      min={props.min}
      max={props.max}>
      </input>
      <div className={styles.sliderValDiv}>
        {props.sliderVal}
      </div>
    </div>
  )

}


export default Input