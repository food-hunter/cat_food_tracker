export default function Buttons({ filter, setFilter }) {
  const options = ["love", "like", "tolerate", "dislike", "hate"]

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div className="flex flex-wrap mt-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
            ${
              filter === option
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}

        {/* Optional: show current filter */}
        <div className="ml-4 text-sm text-gray-500 italic self-center">
          {filter && `Selected: ${filter}`}
        </div>
      </div>
    </div>
  )
}
