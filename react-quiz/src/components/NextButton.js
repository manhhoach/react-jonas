export default function NextButton({ dispatch, answer, index, numQuestions }) {

   if (answer !== null) {
      if (index === numQuestions - 1) {
         return (
            <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
               Finish
            </button>
         )
      }
      return (
         <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
            Next
         </button>

      )
   }

}