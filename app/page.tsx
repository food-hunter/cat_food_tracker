"use client"

import Image from "next/image"
import CatFoodForm from "./components/CatFoodForm"
import Buttons from "./components/Buttons"
import FoodItem, { CatFoodEntry } from "./components/FoodItem"
import { useEffect, useState } from "react"
const STORAGE_KEY = "catFoodEntries"

export default function Home() {
  const [entries, setEntries] = useState([] as CatFoodEntry[])
  const [filter, setFilter] = useState()

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setEntries(JSON.parse(stored))
      } catch {
        console.warn("Failed to parse cat food entries from localStorage.")
      }
    }
  }, [])

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  // Add new entry
  const addFood = (entry: CatFoodEntry) => {
    const id = Date.now()
    setEntries((prev) => [...prev, { ...entry, id }])
  }

  // Optional: remove or edit entries
  const removeFood = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAllFood = () => {
    setEntries([])
  }

  return (
    <div>
      <CatFoodForm onAddFood={addFood} />
      <Buttons filter={filter} setFilter={setFilter} />
      {entries.map((x) => {
        if (filter === x.rating) {
          return (
            <FoodItem
              key={x.id}
              cat={x.cat}
              rating={x.rating}
              dateTried={x.dateTried}
              name={x.name}
              id={x.id}
            />
          )
        }
      })}
    </div>
  )
}
