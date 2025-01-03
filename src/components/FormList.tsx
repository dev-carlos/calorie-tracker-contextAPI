import { categories, FormT } from "../types"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { FormActions } from "../reducers/form.reducer"

type Props = {
    forms: FormT[],
    dispatch: React.Dispatch<FormActions>
}
export default function FormList({ forms, dispatch }: Props) {

    const actividadName = (form: FormT) => {
        return categories.map(cat => cat.id === form.categoria ? cat.name : '')
    }

    return forms && forms.length ? (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y actividades</h2>
            {
                forms.map(f => (
                    <div key={f.id}
                        className="px-5 bg-white mt-5 flex justify-between shadow">
                        <div className="space-y-2 relative py-3">
                            <p className="">
                                {actividadName(f)}
                            </p>
                            <p className="text-2xl font-bold pt-5">
                                {f.actividad}
                            </p>
                            <p className="font-black text-4xl text-lime-600">
                                {f.calorias} calorias
                            </p>
                        </div>
                        <div className="flex gap-5 items-center">
                            <button>
                                <PencilSquareIcon
                                    onClick={() => dispatch({ type: 'set-activeId', payload: { id: f.id } })}
                                    className="h-8 w-8 text-gray-800" />
                            </button>

                            <button>
                                <XCircleIcon
                                    onClick={() => dispatch({ type: 'delete-form', payload: { id: f.id } })}
                                    className="h-8 w-8 text-red-800" />
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    ) :
        (
            <>
                <h2 className="text-4xl font-bold text-slate-600 text-center">No existe ningún registro que mostrar</h2>
            </>
        )

}