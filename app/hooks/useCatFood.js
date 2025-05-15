"use client"

import { useEffect, useState } from "react"
import CatFoodForm from "./components/CatFoodForm"
import FoodItem, { CatFoodEntry } from "./components/FoodItem"

const STORAGE_KEY = "catFoodEntries"

export default function Home() {
  const [entries, setEntries] = useState < CatFoodEntry[] > ([])
  const [preference, setPreference] = useState()

  // Load from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return

    try {
      const parsed: CatFoodEntry[] = JSON.parse(stored)
      setEntries(parsed)
    } catch (error) {
      console.warn("Failed to parse cat food entries from localStorage.")
    }
  }, [])

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const addFood = (entry: Omit<CatFoodEntry, "id">) => {
    const newEntry: CatFoodEntry = { ...entry, id: Date.now() }
    setEntries((prev) => [...prev, newEntry])
  }

  const removeFood = (index: number): void => {
    setEntries((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAllFood = (): void => {
    setEntries([])
  }

  return (
    <div className="p-4 max-w-xl mx-auto">

      <CatFoodForm onAddFood={addFood} />
      <div className="mt-6 space-y-4">
        {entries.map((entry) => (
          <FoodItem
            key={entry.id}
            id={entry.id}
            cat={entry.cat}
            rating={entry.rating}
            dateTried={entry.dateTried}
            name={entry.name}
          />
        ))}



      </div>
    </div>
  )
}
