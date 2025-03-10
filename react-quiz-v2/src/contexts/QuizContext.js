import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext()

const SECS = 30
const initialState = {
   questions: [],
   status: 'loading',
   index: 0,
   answer: null,
   points: 0,
   highScore: 0,
   secondsRemaining: null
}
function reducer(state, action) {
   switch (action.type) {
      case 'dataReceived':
         return {
            ...state,
            questions: action.payload,
            status: 'ready'
         }
      case 'dataFailed':
         return {
            ...state, status: 'error'
         }
      case 'start':
         return {
            ...state,
            status: 'active',
            secondsRemaining: state.questions.length * SECS
         }
      case 'newAnswer':
         const question = state.questions.at(state.index)
         return {
            ...state,
            answer: action.payload,
            points: action.payload === question.correctOption ? state.points + question.points : state.points
         }
      case 'nextQuestion':
         return {
            ...state,
            index: state.index + 1,
            answer: null
         }
      case 'finish':
         return {
            ...state,
            status: 'finished',
            highScore: state.points > state.highScore ? state.points : state.highScore
         }
      case 'restart':
         return {
            ...initialState,
            questions: state.questions,
            status: 'ready'
         }
      case 'tick':
         return {
            ...state,
            secondsRemaining: state.secondsRemaining - 1,
            status: state.secondsRemaining === 0 ? 'finished' : state.status
         }
      default:
         throw new Error('Unknown action')
   }
}
function QuizProvider({ children }) {
   const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] = useReducer(reducer, initialState)
   useEffect(function () {
      fetch(`http://localhost:8000/questions`)
         .then((res) => {
            return res.json()
         })
         .then(data => dispatch({ type: 'dataReceived', payload: data }))
         .catch(err => dispatch({ type: 'dataFailed' }))
   }, [])
   return <QuizContext.Provider
      value={{
         questions, status, index, answer, points, highScore, secondsRemaining, dispatch,
         numQuestions: questions.length,
         maxPoints: questions.reduce((current, next) => current + next.points, 0)
      }}>
      {children}
   </QuizContext.Provider>
}

function useQuiz() {
   const ctx = useContext(QuizContext);
   return ctx;
}

export { QuizProvider, useQuiz }