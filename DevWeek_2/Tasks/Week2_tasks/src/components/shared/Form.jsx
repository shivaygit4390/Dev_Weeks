/*
  Shared helper form used by MultiStepForm.

  Why shared?
  - step 1, 2, 3 all follow the same two-input pattern
  - one shared component removes repeated JSX
*/
const Form = ({ first, second, header, handleChange, next, prev, name1, name2, val1, val2 }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Submitted')
  }

  return (
    <>
      <div>{header}</div>
      <div className="p-5 bg-cyan-700">{header}</div>
      <form onSubmit={handleSubmit}>
        {header !== 'Review' ? (
          <>
            <label>
              1. {first}:
              <input value={val1} onChange={handleChange} type="text" name={name1} />
            </label>
            <br />
            <label>
              2. {second}:
              <input type="text" value={val2} name={name2} onChange={handleChange} />
            </label>
          </>
        ) : null}
        <button className="p-5 bg-amber-950" type="button" onClick={prev}>
          Prev
        </button>
        {next ? (
          <button className="p-5 bg-green-950" type="button" onClick={next}>
            Next
          </button>
        ) : null}
        {header === 'Review' ? <button className="bg-green-600 p-9">Submit Finally</button> : null}
      </form>
    </>
  )
}

export default Form
