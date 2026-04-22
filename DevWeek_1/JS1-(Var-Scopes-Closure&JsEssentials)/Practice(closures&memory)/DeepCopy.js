const obj1 = {
    name: "Nirmal",
    acad_details : {
        dept : "CS",
        year : 4,
        building : "pharma"
    }
}

const deepCopy = structuredClone(obj1);
deepCopy.acad_details.year =  2;
console.log(deepCopy);
console.log(obj1);

// JSON parse/stringify (limitations)
// if we make deep copy using this it will not work with inner functions
//  if nested obj cintauns it functions gives undefined date becimes string so jsoin methind fails

// const deep2 = JSON.parse(JSON.stringify(obj1));
// deep2.acad_details.year =  2;
// console.log(deep2);
// console.log(obj1);

