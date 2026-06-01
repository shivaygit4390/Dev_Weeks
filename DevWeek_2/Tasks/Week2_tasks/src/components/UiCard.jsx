

const UiCard = ({id, name, email, role, city, isOnline, bio}) => {
  return (
    <div className="bg-white shadow-md border-4 rounded-lg p-4">
      <h3 className="text-2xl text-center  font-bold text-gray-800">Profile Card</h3>
      <div className="text-left  "> 
        <div className="text-lg font-semibold text-gray-700">ID: {id}</div>
        <div className="text-lg font-semibold text-gray-700">Name: {name}</div>
        <div className="text-lg font-semibold text-gray-700">Email: {email}</div>
        <div className="text-lg font-semibold text-gray-700">Role: {role}</div>
        <div className="text-lg font-semibold text-gray-700">City: {city}</div>
        <div className="text-lg font-semibold text-gray-700">Online: {isOnline ? <span className="text-green-600" >'Yes'</span> : <span className="text-red-600">'No'</span> }</div>
        <div className="text-lg font-semibold text-gray-700">Bio: {bio}</div>
      </div>
    </div>
  )
}

export default UiCard