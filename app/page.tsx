"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import CatFoodForm from "./components/CatFoodForm"
import Buttons from "./components/Buttons"
import FoodItem, { CatFoodEntry } from "./components/FoodItem"
import luna_pic from "../public/images/luna_pic.jpg"
import persimmons_pic from "../public/images/persimmons_pic.jpg"

const STORAGE_KEY = "catFoodEntries"
const FILTER_KEY = "catFoodFilter"

// Map rating strings to numeric values for averaging
const ratingValues: Record<string, number> = {
  love: 5,
  like: 4,
  tolerate: 3,
  dislike: 2,
  hate: 1,
}

// Map numeric average back to closest rating label for display
function getClosestRating(avg: number): string {
  // Find the rating label with the closest numeric value to avg
  const entries = Object.entries(ratingValues)
  let closest = entries[0][0]
  let minDiff = Math.abs(avg - entries[0][1])
  for (const [label, val] of entries) {
    const diff = Math.abs(avg - val)
    if (diff < minDiff) {
      minDiff = diff
      closest = label
    }
  }
  return closest
}

export default function Home() {
  const [entries, setEntries] = useState<CatFoodEntry[]>([])
  const [filter, setFilter] = useState<string | undefined>()
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)
  //  FOOD RATING
  // Group entries by food name and calculate average rating
  const foodRatings: {
    name: string
    average: number
    label: string
    count: number
  }[] = []

  const foodMap: Record<string, CatFoodEntry[]> = {}

  for (const entry of entries) {
    const key = entry.name.toLowerCase()
    if (!foodMap[key]) foodMap[key] = []
    foodMap[key].push(entry)
  }

  for (const [name, group] of Object.entries(foodMap)) {
    const sum = group.reduce((acc, cur) => acc + ratingValues[cur.rating], 0)
    const avg = sum / group.length
    foodRatings.push({
      name,
      average: avg,
      label: getClosestRating(avg),
      count: group.length,
    })
  }

  foodRatings.sort((a, b) => b.average - a.average) // optional: sort by best

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

    const storedFilter = localStorage.getItem(FILTER_KEY)
    if (storedFilter) setFilter(storedFilter)
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  // Save filter to localStorage whenever it changes
  useEffect(() => {
    if (filter) {
      localStorage.setItem(FILTER_KEY, filter)
    } else {
      localStorage.removeItem(FILTER_KEY)
    }
  }, [filter])

  // Add new entry
  const addFood = (entry: CatFoodEntry) => {
    const id = Date.now().toString()
    setEntries((prev) => [...prev, { ...entry, id }])
  }

  // Remove entry by ID
  const removeFoodById = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  // Clear all entries
  const clearAllFood = () => {
    setEntries([])
    localStorage.removeItem(STORAGE_KEY)
  }

  // Filtered and searched entries
  const filteredEntries = entries
    .filter((x) => !filter || x.rating === filter)
    .filter(
      (x) =>
        x.name.toLowerCase().includes(search.toLowerCase()) ||
        x.cat.toLowerCase().includes(search.toLowerCase())
    )
    .sort(
      (a, b) =>
        new Date(b.dateTried).getTime() - new Date(a.dateTried).getTime()
    )

  // Calculate average rating per cat
  const cats = ["Luna", "Purrsimmons"] as const

  const averageRatings = cats.map((cat) => {
    const catEntries = entries.filter((e) => e.cat === cat)
    if (catEntries.length === 0) return { cat, average: 0, label: "N/A" }
    const sum = catEntries.reduce(
      (acc, cur) => acc + ratingValues[cur.rating],
      0
    )
    const avg = sum / catEntries.length
    return { cat, average: avg, label: getClosestRating(avg) }
  })

  const foodRatingLookup = foodRatings.reduce((acc, cur) => {
    acc[cur.name.toLowerCase()] = cur
    return acc
  }, {} as Record<string, { average: number; label: string; count: number }>)

  const enrichedEntries = filteredEntries.map((entry) => {
    const ratingInfo = foodRatingLookup[entry.name.toLowerCase()]
    return {
      ...entry,
      averageRating: ratingInfo?.average ?? 0,
      averageLabel: ratingInfo?.label ?? "N/A",
    }
  })

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
        {/* <CatFoodForm onAddFood={addFood} setShowForm={setShowForm} /> */}

        <div className="flex flex-col items-center space-y-4">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Add New Food Entry
            </button>
          ) : (
            <CatFoodForm
              onAddFood={(entry) => {
                addFood(entry)
              }}
              setShowForm={setShowForm}
            />
          )}
        </div>

        <Image
          src={persimmons_pic}
          alt="Purrsimmons"
          width={200}
          height={200}
          className="rounded-xl shadow-md"
        />
      </div>

      {/* Average rating display */}
      <div className="w-full max-w-2xl flex justify-around mb-6">
        {averageRatings.map(({ cat, average, label }) => (
          <div
            key={cat}
            className="p-4 bg-gray-100 rounded shadow text-center w-40"
          >
            <h3 className="font-semibold text-lg">{cat}</h3>
            {average === 0 ? (
              <p className="text-gray-500">No entries yet</p>
            ) : (
              <>
                <p className="text-xl font-bold">{average.toFixed(2)}</p>
                <p className="capitalize text-gray-700">{label}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
        {cats.map((cat) => {
          const catEntries = entries.filter((e) => e.cat === cat)
          const total = catEntries.length

          // Find most loved and disliked food for the cat
          const loved = catEntries.filter((e) => e.rating === "love")
          const hated = catEntries.filter((e) => e.rating === "hate")

          return (
            <div
              key={cat}
              className="p-4 bg-blue-50 rounded shadow-sm space-y-1 border border-blue-100"
            >
              <h4 className="font-semibold text-base mb-1">{cat} Stats</h4>
              <p>
                Total entries: <span className="font-medium">{total}</span>
              </p>
              <p>
                Most loved:{" "}
                <span className="font-medium">{loved[0]?.name || "None"}</span>
              </p>
              <p>
                Most hated:{" "}
                <span className="font-medium">{hated[0]?.name || "None"}</span>
              </p>
            </div>
          )
        })}

        {/* Global stats */}
        <div className="p-4 bg-green-50 rounded shadow-sm space-y-1 border border-green-100 col-span-full md:col-span-2">
          <h4 className="font-semibold text-base mb-1">Overall Stats</h4>
          <p>
            Total entries: <span className="font-medium">{entries.length}</span>
          </p>
          <p>
            Unique foods tried:{" "}
            <span className="font-medium">
              {new Set(entries.map((e) => e.name.toLowerCase())).size}
            </span>
          </p>
          <p>
            Most frequently tried:{" "}
            <span className="font-medium">
              {(() => {
                const freqMap: Record<string, number> = {}
                for (const entry of entries) {
                  const name = entry.name.toLowerCase()
                  freqMap[name] = (freqMap[name] || 0) + 1
                }
                const sorted = Object.entries(freqMap).sort(
                  (a, b) => b[1] - a[1]
                )
                return sorted[0]?.[0] || "None"
              })()}
            </span>
          </p>
        </div>
      </div>

      {/* Buttons and search */}
      <Buttons filter={filter} setFilter={setFilter} />
      <input
        type="text"
        placeholder="Search by name or cat"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 border rounded shadow-sm w-full max-w-md"
      />

      {/* Clear all button */}
      {entries.length > 0 && (
        <button
          onClick={clearAllFood}
          className="px-4 py-2 text-sm font-semibold bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear All Entries
        </button>
      )}

      {/* Food entries */}
      <div className="w-full max-w-2xl space-y-4">
        {enrichedEntries.map((x) => (
          <FoodItem key={x.id} {...x} onRemove={() => removeFoodById(x.id)} />
        ))}
        {filteredEntries.length === 0 && (
          <p className="text-gray-500 text-center">
            No matching entries found.
          </p>
        )}
      </div>
    </div>
  )
}
