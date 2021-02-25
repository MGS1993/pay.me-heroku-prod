import React, { useState } from 'react'
import styles from './InputForm.module.css';
import Input from '../../Input/Input';
const InputForm = props => {
  const [itemName, setItemName] = useState('')
  const [expense, setExpense] = useState(0)
  const [tipPercentage, setTipPercentage] = useState(0)
  const [splitBy, setSplitBy] = useState(0)
  const [formSubmitted, setFormSubmitted] = useState(false);

  let submitBtnStyle = {
    backgroundColor: '#1bc2f9',
    border: '1px solid #1bc2f9',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    height: '40px'
  }
  let formSubmitHelper = formSubmitted
  // const handleFormSubmit = e => {
  //   e.preventDefault();
  //   let dataBody 
  //   let calcExp
  //   let calcSplit
  //   if((tipPercentage === '' || tipPercentage === 0 ) && (splitBy > 0)) {
  //     const userEmail = localStorage.getItem('userEmail');
  //     calcSplit = +expense * +splitBy / 100 
  //     console.log('test')
  //     dataBody = {
  //       itemName,
  //       expense: expense,
  //       payMe: calcSplit,
  //       email: userEmail
  //     }
  //   }
    
  //   if(tipPercentage > 0 && splitBy > 0) {
  //     const userEmail = localStorage.getItem('userEmail');
  //     let calcTip = tipPercentage / 100
  //     let totalTip = calcTip * expense
      
  //     calcExp = +totalTip + +expense
  //     calcSplit = +calcExp * +splitBy / 100 
  //     dataBody = {
  //       itemName,
  //       expense: calcExp ,
  //       payMe: calcExp - (+calcExp - +calcSplit),
  //       email: userEmail,
        
  //     }
  //   }
    
  //   fetch('api/add-expense', {
  //     method: 'POST',
  //     body: JSON.stringify(dataBody),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //   })

  //   fetch('api/add-expense/send-reminder', {
  //     method: 'POST',
  //     body: JSON.stringify(dataBody),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   // console.log(dataBody)
  //   setItemName('');
  //   setExpense('');
  //   setTipPercentage('');
  //   setSplitBy('');
    
    
  // }
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
    
    // fetch('api/add-expense', {
    //   method: 'POST',
    //   body: JSON.stringify(dataBody),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    // })
    console.log('add expense', dataBody)
    console.log('reminder send for dataBody')
    // fetch('api/add-expense/send-reminder', {
    //   method: 'POST',
    //   body: JSON.stringify(dataBody),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })

    // console.log(dataBody)
    setItemName('');
    setExpense('');
    setTipPercentage('');
    setSplitBy('');
    
    
  }
  return(
    <React.Fragment>                      
      <form className={styles.form} onSubmit={handleFormSubmit}>
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
      {props.formSubmitHelper}
    </React.Fragment>
  )
}

export default InputForm