import { FormT } from "../types"

export type FormActions =
    {
        type: 'save-activity',
        payload: {
            newForm: FormT
        }
    } |
    {
        type: 'set-activeId',
        payload: {
            id: FormT['id']
        }
    } |
    {
        type: 'delete-form',
        payload: {
            id: FormT['id']
        }
    } |
    {
        type: 'reset-app'
    }

export type FormState = {
    forms: FormT[],
    activeId: FormT['id']
}

const getInitialData = (): FormT[] => {
    const localStorageData = localStorage.getItem('forms');
    return localStorageData ? JSON.parse(localStorageData) : []
}

export const initialState: FormState = {
    forms: getInitialData(),
    activeId: ''
}

export const FormReducer = (
    state: FormState = initialState,
    action: FormActions) => {

    if (action.type === 'save-activity') {
        const newForm = action.payload.newForm;
        if (newForm?.id !== state.activeId) {
            return {
                ...state,
                forms: [...state.forms, newForm],
                activeId: ''
            }
        }
        else {
            const editedForms = state.forms
                .map(form => {
                    if (form.id === newForm?.id) {
                        return newForm;
                    }
                    return form;
                });
            return {
                ...state,
                forms: editedForms,
                activeId: ''
            }
        }
    }
    if (action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }
    if (action.type === 'delete-form') {
        const filteredForms = state.forms.filter(f => f.id !== action.payload.id);
        return {
            ...state,
            forms: filteredForms
        }
    }
    if (action.type === 'reset-app') {
        return {
            forms: [],
            activeId: ''
        }
    }

    return state;
}