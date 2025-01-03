import { useMemo } from "react"
import { FormT } from "../types"
import CalorieDisplay from "./CalorieDisplay"

type Props = {
    forms: FormT[]
}

export default function CalorieTracker({ forms }: Props) {

    const caloriasConsumidas = useMemo(() =>
        forms.reduce((total, form) => form.categoria === 1 ? total + form.calorias : total, 0)
        , [forms])
    const caloriasIngeridas = useMemo(() =>
        forms.reduce((total, form) => form.categoria === 2 ? total + form.calorias : total, 0)
        , [forms])
    const caloriasTotales = useMemo(() => caloriasConsumidas - caloriasIngeridas, [forms])

    return (
        <>
            <h2 className=" text-4xl font-black text-white text-center">
                Resumen de calorias
            </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-around gap-5 mt-10">
                <CalorieDisplay calories={caloriasConsumidas} text="Consumidas" />
                <CalorieDisplay calories={caloriasTotales} text="Totales" />
                <CalorieDisplay calories={caloriasIngeridas} text="Ingeridas" />
            </div>


        </>
    )
}