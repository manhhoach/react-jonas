import { useState } from "react";
import CurrencyConvert from "./CurrencyConverter";

const messages = [
  'Learn React',
  'Apply for jobs',
  'Invest your income'
]
function App() {

  return (
    <>
      <Step></Step>
    </>

  );
}

function Step() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  function handlePrev() {
    if (step > 1)
      setStep(pre => pre - 1)
  }
  function handleNext() {
    if (step < 3)
      setStep(pre => pre + 1)
  }

  return (
    <>
      {/* {isOpen && <div className="steps">
        <div className="numbers">
          <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`${step >= 3 ? 'active' : ''}`}>3</div>

        </div>
        <StepMessage step={step}>{messages[step - 1]}</StepMessage>
        <div className="buttons">
          <Button text='Pre' textColor='#fff' bgColor='red' onClick={handlePrev}>
            <span>Prev</span>
          </Button>
          <Button text={'Next'} textColor={'#fff'} bgColor={'blue'} onClick={handleNext}>
            <span>Next</span>
          </Button>
        </div>
      </div>}
      <button style={{ padding: "10px 20px" }} onClick={() => setIsOpen(!isOpen)}></button> */}

      <CurrencyConvert></CurrencyConvert>
    </>

  );
}

function StepMessage({ step, children }) {
  return <div className="message">
    <h3>Step {step}</h3>
    {children}
  </div>
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button style={{ backgroundColor: bgColor, color: textColor }} onClick={onClick}>{children}</button>
  )
}

export default App;
