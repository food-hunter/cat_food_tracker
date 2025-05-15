export interface CatFoodEntry {
  id: any
  cat: string
  name: string
  rating: "love" | "like" | "tolerate" | "dislike" | "hate"
  dateTried: string // ISO format YYYY-MM-DD
}
export default function FoodItem({
  cat,
  name,
  rating,
  dateTried,
}: CatFoodEntry) {
  return (
    <div>
      <h2>Food Items</h2>
      {
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "8px",
          }}
        >
          <p>
            <strong>Cat:</strong> {cat}
          </p>
          <p>
            <strong>Food Name:</strong> {name}
          </p>
          <p>
            <strong>Rating:</strong> {rating}
          </p>
          <p>
            <strong>Date Tried:</strong> {dateTried}
          </p>
        </div>
      }
    </div>
  )
}
