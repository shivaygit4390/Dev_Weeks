import { useState } from 'react'

const CounterConstraints = () => {
  /*
    Why this task exists:
    - practice state updates
    - practice adding rules on top of state
    - understand that UI should respect business constraints
  */
  const [count, setCount] = useState(0)
  const [limitMessage, setLimitMessage] = useState('')

  const handleIncrease = () => {
    if (count >= 10) {
      setLimitMessage('Limited: cannot go above 10')
      return
    }

    setLimitMessage('')
    setCount((prev) => prev + 1)
  }

  const handleDecrease = () => {
    if (count <= 0) {
      setLimitMessage('Limited: cannot go below 0')
      return
    }

    setLimitMessage('')
    setCount((prev) => prev - 1)
  }

  return (
    <>
      <h1>CounterConstraints</h1>
      <div>Counter: {count}</div>
      {!limitMessage ? null : (
        <div className="p-2 bg-red-700 text-white">{limitMessage}</div>
      )}
      <button className="p-2 bg-green-500" onClick={handleIncrease}>
        Increase
      </button>
      <button className="p-2 bg-red-500" onClick={handleDecrease}>
        Decrease
      </button>
    </>
  )
}

export default CounterConstraints
