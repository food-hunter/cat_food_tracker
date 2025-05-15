"use client"
import React, { useState } from "react"

const CatFoodForm = ({ onAddFood }) => {
  const [formData, setFormData] = useState({
    cat: "Luna",
    name: "",
    rating: "like",
    dateTried: new Date().toISOString().split("T")[0], // today's date
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return // skip empty food names

    onAddFood(formData)
    setFormData((prev) => ({
      ...prev,
      name: "",
      rating: "like",
      dateTried: new Date().toISOString().split("T")[0],
    }))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold">Add New Food Entry</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Cat</label>
        <select
          name="cat"
          value={formData.cat}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="Luna">Luna</option>
          <option value="Purrsimmons">Purrsimmons</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Food Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          placeholder="e.g., Weruva Chicken in Gravy"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          <option value="love">Love</option>
          <option value="like">Like</option>
          <option value="tolerate">Tolerate</option>
          <option value="dislike">Dislike</option>
          <option value="hate">Hate</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date Tried</label>
        <input
          type="date"
          name="dateTried"
          value={formData.dateTried}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Food
      </button>
    </form>
  )
}

export default CatFoodForm
