export interface CatFoodEntry {
  id: string
  cat: string
  name: string
  rating: "love" | "like" | "tolerate" | "dislike" | "hate"
  dateTried: string // ISO format YYYY-MM-DD
  onRemove?: () => void
  averageRating?: number
  averageLabel?: string
}

const ratingStyles: Record<
  CatFoodEntry["rating"],
  { emoji: string; bgColor: string; textColor?: string }
> = {
  love: { emoji: "😍", bgColor: "#4caf50" }, // Green
  like: { emoji: "😊", bgColor: "#8bc34a" }, // Light green
  tolerate: { emoji: "😐", bgColor: "#ffeb3b", textColor: "#333" }, // Yellow
  dislike: { emoji: "😾", bgColor: "#ff9800" }, // Orange
  hate: { emoji: "💀", bgColor: "#f44336" }, // Red
}

export default function FoodItem({
  cat,
  name,
  rating,
  dateTried,
  onRemove,
  averageRating,
  averageLabel,
}: CatFoodEntry) {
  const { emoji, bgColor, textColor = "#fff" } = ratingStyles[rating]

  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: "1px solid #ccc",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <p>
          <strong>Cat:</strong> {cat}
        </p>
        <p>
          <strong>Food Name:</strong> {name}
        </p>
        <p>
          <strong>Rating:</strong> {emoji} {rating}
        </p>
        <p>
          <strong>Date Tried:</strong> {dateTried}
        </p>

        {averageRating !== undefined && averageLabel !== undefined && (
          <p style={{ marginTop: "6px", fontSize: "0.9rem" }}>
            <strong>Average Rating:</strong> {averageRating.toFixed(2)} (
            {averageLabel})
          </p>
        )}
      </div>

      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "12px",
            alignSelf: "flex-start",
          }}
        >
          Delete
        </button>
      )}
    </div>
  )
}
