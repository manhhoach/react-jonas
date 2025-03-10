import { useQuiz } from "../contexts/QuizContext"

export default function FinishScreen() {
   const { points, maxPoints, highScore, dispatch } = useQuiz()
   const percent = Math.ceil((points / maxPoints) * 100)
   return (
      <>
         <p className="result">
            You scored <strong>{points}</strong> out of {maxPoints} ({percent}%)
         </p>
         <p className="highscore">(Highscore: {highScore} points)</p>

         <button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>
            Restart quiz
         </button>
      </>

   )
}