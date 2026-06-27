import { useState } from "react"
import Form from "../../components/shared/Form";


const MultiStepForm = () => {
  /*
    Why this task exists:
    - practice bigger form state
    - practice conditional rendering
    - practice preserving values while moving across steps
  */
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    role: "",
    password: "",
    confirmPassword: "",
  })

  const handleNext = () => {
    if (step <= 3) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // One common object state is easier to revise here than many small states.
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  return (
    <>
      <div>MultiStepForm</div>
      <div className="bg-green-800 text-cyan-50 p-5">{step}</div>

      {step === 1 ? (
        <Form
          first="Name"
          second="Email"
          header="Step1"
          name1="name"
          name2="email"
          handleChange={handleChange}
          next={handleNext}
          prev={handlePrev}
          val1={formData.name}
          val2={formData.email}
        />
      ) : null}

      {step === 2 ? (
        <Form
          first="City"
          second="Role"
          header="Step2"
          name1="city"
          name2="role"
          handleChange={handleChange}
          next={handleNext}
          prev={handlePrev}
          val1={formData.city}
          val2={formData.role}
        />
      ) : null}

      {step === 3 ? (
        <Form
          first="Pass"
          second="Confirm Pass"
          header="Step3"
          name1="password"
          name2="confirmPassword"
          handleChange={handleChange}
          next={handleNext}
          prev={handlePrev}
          val1={formData.password}
          val2={formData.confirmPassword}
        />
      ) : null}

      {step === 4 ? (
        <>
          <Form header="Review" prev={handlePrev} />
          <div>
            {Object.keys(formData).map((key) => (
              <div key={key}>
                {key}: {formData[key]}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

export default MultiStepForm
