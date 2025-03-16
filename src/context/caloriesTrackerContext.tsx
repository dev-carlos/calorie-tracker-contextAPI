import { createContext, ReactNode, useReducer } from "react"
import { FormActions, FormReducer, FormState, initialState } from "../reducers/form.reducer"

type CaloriesTrackerProps = {
    state: FormState,
    dispatch: React.Dispatch<FormActions>,
}

type CaloriesTrackerProviderProps = {
    children: ReactNode
}

export const CaloriesTrackerContext = createContext<CaloriesTrackerProps>({
    state: initialState,
    dispatch: (value: FormActions): void => { throw new Error(`function ${value} not implemented`) }
})

export const caloriesTrackerProvider = ({ children }: CaloriesTrackerProviderProps) => {
    const [state, dispatch] = useReducer(FormReducer, initialState)
    return (
        <CaloriesTrackerContext.Provider value={{
            state, dispatch
        }}>
            {children}
        </CaloriesTrackerContext.Provider>
    )
}