"use client"

import Image from "next/image"
import CatFoodForm from "./components/CatFoodForm"
import Buttons from "./components/Buttons"
import FoodItem, { CatFoodEntry } from "./components/FoodItem"
import { useEffect, useState } from "react"
import luna_pic from "../public/images/luna_pic.jpg"
import persimmons_pic from "../public/images/persimmons_pic.jpg"
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
    <div className="flex flex-col items-center px-4 py-8 space-y-8">
      {/* Top layout with images and form */}
      <div className="flex flex-row items-center justify-center gap-6 flex-wrap">
        <Image
          src={luna_pic}
          alt="Luna"
          width={200}
          height={200}
          className="rounded-xl shadow-md"
        />
        <CatFoodForm onAddFood={addFood} />
        <Image
          src={persimmons_pic}
          alt="Purrsimmons"
          width={200}
          height={200}
          className="rounded-xl shadow-md"
        />
      </div>
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
