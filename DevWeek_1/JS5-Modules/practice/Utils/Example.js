/*
  Task objective:
  - keep a module-level value private
  - expose only a getter function through export

  Revision purpose:
  - simplest module example
  - keep a value private and expose only one function to read it
*/

let name = "Nirmal";

export function getName(){
    // External files can call this function,
    // but they still cannot directly touch the private variable itself.
    return name;
}

// `name` stays private to this module and is read only through the exported function.
