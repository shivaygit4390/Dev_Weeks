// TASK: Safe Update Function

// Objective:
// Create a function updateCity(user, newCity) that updates the city in a user object without changing the original object.

// What you need to do:

// Take 2 inputs:
// user → an object
// newCity → new city value
// Return a NEW object
// Updated object should have the new city
// Original user object must remain unchanged

// What interviewer is testing:

// Do you understand mutation vs immutability
// Can you update object data safely
// Do you know how to return a copied object instead of modifying original

// Expected behavior:

// const user = {
// name: "Nirmal",
// city: "Lucknow"
// };

// const updatedUser = updateCity(user, "Delhi");

// updatedUser
// // { name: "Nirmal", city: "Delhi" }

// user
// // { name: "Nirmal", city: "Lucknow" }

// Rule:
// Do NOT directly change:

// user.city = newCity ❌

// Because that mutates original object

// Goal:
// Make update in an immutable way and return updated copy

// Why used in real projects:

// React state updates
// Redux / context updates
// safer object handling
// prevents accidental side effects

const user = {
  name: "Nirmal",
  city: "Lucknow"
};

const updateCity = (user, newCity) => {
  // Use shallow copy for top-level updates to avoid mutating original object
  // Deep copy is only required when modifying nested data
  const updatedUser = { ...user, city: newCity };

  // Alternative approach (less preferred in interviews):
  // const updatedUser = { ...user };
  // updatedUser.city = newCity;

  return updatedUser;
};

console.log(updateCity(user, "Delhi")); // { name: "Nirmal", city: "Delhi" }
console.log(user); // original object remains unchanged