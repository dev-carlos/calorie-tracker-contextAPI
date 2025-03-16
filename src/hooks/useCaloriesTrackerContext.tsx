import React, { useContext } from 'react'
import { CaloriesTrackerContext } from '../context/caloriesTrackerContext'


export default function useCaloriesTrackerContext() {
    const context = useContext(CaloriesTrackerContext);
    if (!context) {
        throw new Error("context must be used within a provider")
    }
    return context
}