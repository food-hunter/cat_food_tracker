type ButtonsProps = {
  filter: string | undefined
  setFilter: (filter: string | undefined) => void
}

const ratingColors: Record<string, string> = {
  love: "#22c55e", // green-500
  like: "#3b82f6", // blue-500
  tolerate: "#facc15", // yellow-400
  dislike: "#f97316", // orange-500
  hate: "#ef4444", // red-500
}

const ratingValues: Record<string, number> = {
  love: 5,
  like: 4,
  tolerate: 3,
  dislike: 2,
  hate: 1,
}

const buttonClassName =
  "ml-4 self-center text-sm italic text-gray-500 select-none"

export default function Buttons({ filter, setFilter }: ButtonsProps) {
  const options = ["love", "like", "tolerate", "dislike", "hate"]

  return (
    <div className="flex justify-center w-full mt-4">
      <div className="flex flex-wrap gap-3">
        {options.map((option) => {
          const isSelected = filter === option
          const bgColor = ratingColors[option]
          return (
            <button
              key={option}
              onClick={() => setFilter(isSelected ? undefined : option)}
              className={`
                px-5 py-2 rounded-full text-sm font-semibold transition
                focus:outline-none focus:ring-2 focus:ring-offset-1
              `}
              style={{
                backgroundColor: isSelected ? bgColor : "#e5e7eb", // gray-200
                color: isSelected ? "white" : ratingColors[option],
                boxShadow: isSelected ? `0 0 8px ${bgColor}` : "none",
              }}
              aria-pressed={isSelected}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)} (
              {ratingValues[option]})
            </button>
          )
        })}

        {filter && (
          <div className={buttonClassName}>
            Selected:{" "}
            <span style={{ color: ratingColors[filter] }}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </span>
          </div>
        )}
        <button
          className={buttonClassName}
          onClick={() => {
            setFilter(undefined)
          }}
        >
          All
        </button>
      </div>
    </div>
  )
}
