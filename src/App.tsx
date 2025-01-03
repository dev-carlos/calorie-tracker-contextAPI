import Form from "./components/Form"
import { useEffect, useReducer } from "react"
import { FormReducer, initialState } from "./reducers/form.reducer"
import FormList from "./components/FormList"
import CalorieTracker from "./components/CalorieTracker"


function App() {

  const [state, dispatch] = useReducer(FormReducer, initialState)

  useEffect(() => localStorage.setItem('forms', JSON.stringify(state.forms)), [state.forms])

  return (
    <>
      <header className="bg-lime-400 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Calorie tracker
          </h1>
          <button
            disabled={state.forms.length === 0}
            onClick={() => dispatch({ type: 'reset-app' })}
            className="bg-gray-500 uppercase text-white font-bold cursor-pointer rounded p-2 text-sm hover:bg-gray-800 disabled:opacity-20">
            Reset App
          </button>
        </div>
      </header>
      <section className="bg-lime-300 py-20 px-5">
        <div className="max-w-4xl max-auto">
          <Form
            dispatch={dispatch} state={state} />

        </div>
      </section>
      <section className="bg-gray-800 py-20 px-5">
        <div className="max-w-4xl max-auto">
          <CalorieTracker
            forms={state.forms} />

        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <FormList forms={state.forms} dispatch={dispatch} />
      </section>
    </>
  )
}

export default App
