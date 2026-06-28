/*
  Task objective:
  - create a deep copy of a nested object
  - verify that changing nested data in the copy does not mutate the original object

  Revision purpose:
  - understand real deep copy behavior
  - contrast it mentally against shallow copy for nested data
*/

const obj1 = {
    name: "Nirmal",
    acad_details : {
        dept : "CS",
        year : 4,
        building : "pharma"
    }
}

// structuredClone creates fresh nested objects too.
// That is why changing nested data in deepCopy does not affect obj1.
const deepCopy = structuredClone(obj1);
deepCopy.acad_details.year =  2;
console.log(deepCopy);
console.log(obj1);

// JSON parse/stringify (limitations)
// This approach fails for some real cases:
// - functions are removed
// - Date values turn into strings
// - special object types are not preserved safely

// const deep2 = JSON.parse(JSON.stringify(obj1));
// deep2.acad_details.year =  2;
// console.log(deep2);
// console.log(obj1);

