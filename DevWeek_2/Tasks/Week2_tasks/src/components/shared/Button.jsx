// Small shared button for theme options.
// Keeping it separate makes the ThemeChanger easier to read.
const Button = ({ name, colourName, event }) => {
  return (
    <button onClick={event} className={`p-2 text-xl text-center text-white ${colourName} rounded-md`}>
      {name}
    </button>
  )
}

export default Button
