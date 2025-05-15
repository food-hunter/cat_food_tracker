"use client"

import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react"
import { CatFoodEntry } from "./FoodItem"

type CatFoodFormProps = {
  onAddFood: (entry: CatFoodEntry) => void
  setShowForm: Function
}

const CatFoodForm = ({ onAddFood, setShowForm }: CatFoodFormProps) => {
  const [formData, setFormData] = useState({
    id: "",
    cat: "Luna",
    name: "",
    rating: "like" as "love" | "like" | "tolerate" | "dislike" | "hate",
    dateTried: new Date().toISOString().split("T")[0],
  })

  const [error, setError] = useState("")
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameInputRef.current?.focus()
  }, [])

  const handleClose = () => {
    setShowForm(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (name === "name" && value.trim()) {
      setError("")
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError("Food name is required.")
      return
    }

    onAddFood(formData)
    handleClose()
    setFormData((prev) => ({
      ...prev,
      name: "",
      rating: "like",
      dateTried: new Date().toISOString().split("T")[0],
    }))
    nameInputRef.current?.focus()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800">Add New Food Entry</h2>

      <div>
        <label
          htmlFor="cat"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Cat
        </label>
        <select
          id="cat"
          name="cat"
          value={formData.cat}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="Luna">Luna</option>
          <option value="Purrsimmons">Purrsimmons</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Food Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          ref={nameInputRef}
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            error ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
          }`}
          placeholder="e.g., Weruva Chicken in Gravy"
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter the full name of the food item.
        </p>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="love">Love</option>
          <option value="like">Like</option>
          <option value="tolerate">Tolerate</option>
          <option value="dislike">Dislike</option>
          <option value="hate">Hate</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="dateTried"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Date Tried
        </label>
        <input
          id="dateTried"
          type="date"
          name="dateTried"
          value={formData.dateTried}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full font-semibold"
      >
        Add Food
      </button>
    </form>
  )
}

export default CatFoodForm
