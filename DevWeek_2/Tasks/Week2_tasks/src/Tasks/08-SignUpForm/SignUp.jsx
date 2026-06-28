import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

/*
  Task 08 - SignUp Form

  Why this task exists:
  - practice controlled forms
  - practice manual validation
  - practice programmatic navigation after success
*/

const SignUp = () => {
  const navigate = useNavigate();
    const [FormData, setFormData] = useState({
  fullName: "",
  email: "",
  password: "",
  role: "",
  acceptTerms: false
    })

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const changeHandler = (e) =>{
        const name = e.target.name;
        let value;
        if(name === "acceptTerms"){
         value = e.target.checked;
        }
        else value = e.target.value;
        // Controlled form rule:
        // read latest input event and copy it into React state.
        setFormData((prev) => (
            {
                ...prev,
                [name] : value
            }
        ))
    }

    const submitHandler = (e) =>{
        e.preventDefault();
       const tempErrs = {};
       // Validation happens first.
       // If any field is invalid, we collect messages and stop submission.
       if(!FormData.fullName){
         tempErrs.fullName = "Name Required";
       }
       if(!FormData.email.includes("@")){
          tempErrs.email = "please add a valid email";
       }
       if(FormData.password.length < 6){
        tempErrs.password = "must be more than 6 characters"
       }
       setErrors(tempErrs);
       
       //return and block the submit if validation fails
       if(Object.keys(tempErrs).length > 0) return;
       

   setIsSubmitting(true);
         setTimeout(() => {
            console.log(FormData);
             setIsSubmitting(false);
               // Code-driven navigation:
               // after successful submit, code decides the next route.
               navigate('/users');
        setFormData({
            fullName : "",
            email : "",
            password : "",
            role : "",
            acceptTerms : false
        })
         }, 3000);
      setErrors({});
       
    }

  return (
    <>
   <div className='flex flex-row justify-center p-2 text-3xl bg-amber-950 text-center text-white' > SignUp form</div>
   {/* Every input here is controlled:
       value comes from state, onChange writes back to state. */}
   <form onSubmit={submitHandler} className='flex flex-col justify-center gap-2 p-5' >
    Name : <span>{errors.fullName}</span> <input className='border-2 border-black'  type="text" name='fullName' value={FormData.fullName} onChange={changeHandler}  />
    Email : <span>{errors.email}</span>   <input className='border-2 border-black' type="email" name='email' value={FormData.email}  onChange={changeHandler}  />
    Password : <span>{errors.password}</span>  <input className='border-2 border-black' type="password" name='password' value={FormData.password} onChange={changeHandler}   />
    {/* role: <input className='border-2 border-black' type="text" name='role' value={FormData.role} onChange={changeHandler} /> */}
  Role : <span>{errors.role}</span>   <select className='border-2 border-black' name="role" value={FormData.role} onChange={changeHandler} id="" aria-placeholder='select'>
        <option value="">Select Role</option>
        <option value="Admin">Admin</option>
        <option value="HR">HR</option>
    </select>
   <p> Accepted Terms : <input className='border-2 border-black' type="checkbox" name='acceptTerms' checked = {FormData.acceptTerms} onChange={changeHandler} /></p>
    <button type='submit' disabled = {isSubmitting} className='p-1.5 rounded-2xl bg-green-500 text-white   ' >{
    isSubmitting ? "Submitting..." : "Submit"
        }</button>
   </form>
    </>
  )
}

export default SignUp
