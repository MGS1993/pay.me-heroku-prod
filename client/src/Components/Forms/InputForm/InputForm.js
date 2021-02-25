import React, { useState } from 'react'
import styles from './InputForm.module.css';
import Input from '../../Input/Input';
const InputForm = props => {
  const [itemName, setItemName] = useState('')
  const [expense, setExpense] = useState(0)
  const [tipPercentage, setTipPercentage] = useState(0)
  const [splitBy, setSplitBy] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false);

  let confirmMsgStyle
  let submitBtnStyle = {
    backgroundColor: '#1bc2f9',
    border: '1px solid #1bc2f9',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    height: '40px'
  }
  let confirmMsgDivWrapper = {
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    color: 'green',
    margin: '0'
  }

  formSubmitted ? confirmMsgStyle = {opacity: '1'} : confirmMsgStyle = {opacity: '0'}

  const handleFormSubmit = e => {
    e.preventDefault();
    setFormSubmitted(true);
    let dataBody 
    let calcExp
    let calcSplit
    if((tipPercentage === '' || tipPercentage === 0 ) && (splitBy > 0)) {
      const userEmail = localStorage.getItem('userEmail');
      calcSplit = +expense * +splitBy / 100 
      console.log('test')
      dataBody = {
        itemName,
        expense: expense,
        payMe: calcSplit,
        email: userEmail
      }
    }
    
    if(tipPercentage > 0 && splitBy > 0) {
      const userEmail = localStorage.getItem('userEmail');
      let calcTip = tipPercentage / 100
      let totalTip = calcTip * expense
      
      calcExp = +totalTip + +expense
      calcSplit = +calcExp * +splitBy / 100 
      dataBody = {
        itemName,
        expense: calcExp ,
        payMe: calcExp - (+calcExp - +calcSplit),
        email: userEmail,
      }
    }
  
    fetch('api/add-expense', {
      method: 'POST',
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      },
    })

    fetch('api/add-expense/send-reminder', {
      method: 'POST',
      body: JSON.stringify(dataBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log(dataBody)
    setItemName('');
    setExpense('');
    setTipPercentage('');
    setSplitBy('');
    setTimeout(() => setFormSubmitted(false), 3000)
  }
  return(
    <React.Fragment>                      
      <form className={styles.form} onSubmit={handleFormSubmit}>
      <div style={confirmMsgDivWrapper}>
          <p className={styles.confirmMsg} style={confirmMsgStyle} >Submitted! Reminder at  12:00AM.</p>
        </div>
      <Input
      labelName='Item Name'
      inputType='text'
      inputName='Item-Name'
      value={itemName}
      changed={e => setItemName(e.target.value)} />
      <Input
      labelName='Expense to split'
      inputType='number'
      inputName= 'Expense-to-split'
      value={expense}
      changed={e => setExpense(e.target.value)}/>
      <Input
      labelName='Tip percentage'
      inputType='number'
      inputName='Tip-percentage'
      value={tipPercentage}
      changed={e => setTipPercentage(e.target.value)}/>
      <Input
      labelName="My percent split"
      inputType='number'
      inputName='Split-by'
      value={splitBy}
      changed={e => setSplitBy(e.target.value)}/>
      <Input 
      style={submitBtnStyle}
      inputType='submit'
      value='Submit'/>
      </form>
    </React.Fragment>
  )
}

export default InputForm