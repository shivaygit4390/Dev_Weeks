import { useState } from 'react'
import Button from '../../components/shared/Button'

const ThemeChanger = () => {
  /*
    Why this task exists:
    - practice local state
    - practice event-driven UI updates
    - understand "UI = function of state"
  */
  const [themeClass, setThemeClass] = useState('bg-white')

  const colorOptions = [
    { name: 'Red', colourName: 'bg-red-500' },
    { name: 'Yellow', colourName: 'bg-yellow-500' },
    { name: 'Blue', colourName: 'bg-blue-500' },
    { name: 'Black', colourName: 'bg-black' },
  ]

  const handleThemeToggle = (nextTheme) => {
    // Same color click resets back to white.
    // This is a tiny example of adding UX logic on top of simple state.
    setThemeClass((currentTheme) =>
      currentTheme === nextTheme ? 'bg-white' : nextTheme
    )
  }

  return (
    <div className={`${themeClass} h-[100vh]`}>
      <div className="bg-blue-500 text-white font-extrabold text-4xl border-t-8 border-amber-950 p-4 text-center">
        ThemeChanger
      </div>
      <div className="p-1.5 bg-white flex justify-around">
        {/* Mapping keeps the UI data-driven.
            If you add one more color object, one more button appears automatically. */}
        {colorOptions.map((option) => (
          <Button
            key={option.name}
            {...option}
            event={() => handleThemeToggle(option.colourName)}
          />
        ))}
      </div>
    </div>
  )
}

export default ThemeChanger
