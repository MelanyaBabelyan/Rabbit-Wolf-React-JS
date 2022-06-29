function SelectAndStartButton() {
  return (
    <div>
      <button
        id="start"
        className="start"
        onClick={(eventt) => {
          newGame.render(<StartNewGame />)
        }}
      >
        Start
      </button>
      <select className="select" id="select">
        {options.map((item) => {
          return (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectAndStartButton
