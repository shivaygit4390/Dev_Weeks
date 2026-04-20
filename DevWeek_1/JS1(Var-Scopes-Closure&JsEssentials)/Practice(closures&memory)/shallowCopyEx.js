const obj1 = {
    name: "Nirmal",
    acad_details : {
        dept : "CS",
        year : 4,
        building : "pharma"
    }
}

//shallow copying

const obj2 = {...obj1};

obj2.name = "Deep";
obj2.acad_details.building = "CS";

console.log(obj2);
console.log(obj1);  //name isnt changed but the nested obj(acad details ) is changed in obj1 too as 
// shallow copy shares the referece for nested data




