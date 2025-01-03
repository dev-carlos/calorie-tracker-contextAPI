export type Category = {
    id: number,
    name: string
}

export type FormT = {
    id: string
    categoria: Category["id"],
    actividad: string,
    calorias: number
}

export const categories: Category[] = [
    { id: 1, name: 'Ingeridas' },
    { id: 2, name: 'Consumidas' }
]