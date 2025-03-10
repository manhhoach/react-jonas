import { useState } from "react";
import CountDay from "./CountDay";

const messages = [
  'Learn React',
  'Apply for jobs',
  'Invest your income'
]
function App() {
  // const [step, setStep] = useState(1)
  //const [isOpen, setIsOpen] = useState(false)

  // function handlePrev() {
  //   if (step > 1)
  //     setStep(pre => pre - 1)
  // }
  // function handleNext() {
  //   if (step < 3)
  //     setStep(pre => pre + 1)
  // }
  return (
    <>
      {/* {isOpen && <div className="steps">
        <div className="numbers">
          <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`${step >= 3 ? 'active' : ''}`}>3</div>

        </div>
        <p className="message">
          Step {step}: {messages[step - 1]}
        </p>
        <div className="buttons">
          <button style={{ backgroundColor: "red" }} onClick={handlePrev}>Pre</button>
          <button style={{ backgroundColor: "blue" }} onClick={() => handleNext()}>Next</button>
        </div>
      </div>}
      <button style={{ padding: "10px 20px" }} onClick={() => setIsOpen(!isOpen)}></button> */}

      <CountDay></CountDay>
    </>

  );
}

export default App;
