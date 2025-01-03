import React, { Dispatch, useEffect, useState } from "react"
import { v4 as uuidV4 } from 'uuid'
import { categories, FormT } from "../types"
import { FormActions, FormState } from "../reducers/form.reducer"

type Props = {
    dispatch: (Dispatch<FormActions>),
    state: FormState
}

export default function Form({ dispatch, state }: Props) {

    const initialFormData: FormT = {
        id: uuidV4(),
        categoria: categories[0].id,
        actividad: '',
        calorias: 0
    }
    const [formData, setFormData] = useState<FormT>(initialFormData)

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.id;
        const value = e.target.value;
        const isNumberField = ['categoria', 'calorias'].includes(key);
        setFormData(prevData => {
            return { ...prevData, [key]: isNumberField ? +value : value }
        })
    }

    const isValidForm = () => {
        const { actividad, calorias } = formData;
        return actividad.trim() !== '' && calorias > 0
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch({ type: 'save-activity', payload: { newForm: formData } })
        setFormData({ ...initialFormData, id: uuidV4() })
    }

    useEffect(() => {
        if (state.activeId) {
            const formEdit = state.forms.find(stateForm => state.activeId = stateForm.id);
            setFormData(formEdit || initialFormData);
        }
    }, [state.activeId])

    return (
        <form
            onSubmit={e => handleSubmit(e)}
            className="space-y-5 bg-white shadow p-10 rounded-lg" >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="categoria">Categoria:</label>
                <select
                    name="categoria"
                    id="categoria"
                    value={formData.categoria}
                    onChange={(e) => handleChange(e)}
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {
                        categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="actividad">Actividad:</label>
                <input
                    type="text"
                    id="actividad"
                    value={formData.actividad}
                    onChange={(e) => handleChange(e)}
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, zumo de naranja, ensalada, ejercicio, pesas, bicicleta ..." />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calorias">Calorias:</label>
                <input
                    type="number"
                    id="calorias"
                    value={formData.calorias}
                    onChange={(e) => handleChange(e)}
                    className="border border-slate-300 p-2 rounded-lg "
                    placeholder="Ej. 350" />
            </div>
            <input
                type="submit"
                className="bg-gray-900 text-white font-black w-full p-3 disabled:bg-slate-300"
                value={`Guardar ${categories.find((cat) => formData.categoria === cat.id)?.name}`}
                disabled={!isValidForm()} />
        </form>
    )

}