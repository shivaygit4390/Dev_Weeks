/*
  Task 01 - User Card

  Why this task exists:
  - practice reusable components
  - practice props
  - practice rendering dynamic UI from data

  Keep in mind:
  - the child component should only display data
  - the parent decides what data to pass
  - props are read-only
*/
const UserCard = ({ id, name, email, role, city, isOnline, bio }) => {
  // These derived values keep JSX cleaner.
  // Instead of repeating conditions inside the markup,
  // we prepare display-friendly values once here.
  const statusText = isOnline ? 'Yes' : 'No'
  const statusClass = isOnline ? 'text-green-600' : 'text-red-600'
  const safeBio = bio || 'No bio added yet.'

  return (
    <div className="bg-white shadow-md border-4 rounded-lg p-4">
      <h3 className="text-2xl text-center font-bold text-gray-800">Profile Card</h3>
      <div className="text-left">
        {/* This component only reads props and displays them.
            That is the key revision point:
            parent owns the data, child just renders it. */}
        <div className="text-lg font-semibold text-gray-700">ID: {id}</div>
        <div className="text-lg font-semibold text-gray-700">Name: {name}</div>
        <div className="text-lg font-semibold text-gray-700">Email: {email}</div>
        <div className="text-lg font-semibold text-gray-700">Role: {role}</div>
        <div className="text-lg font-semibold text-gray-700">City: {city}</div>
        <div className="text-lg font-semibold text-gray-700">
          Online: <span className={statusClass}>{statusText}</span>
        </div>
        <div className="text-lg font-semibold text-gray-700">Bio: {safeBio}</div>
      </div>
    </div>
  )
}

export default UserCard
