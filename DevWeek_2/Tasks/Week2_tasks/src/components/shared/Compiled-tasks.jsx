
import UserCard from '../../Tasks/01-user-card/UserCard'
import ThemeChanger from '../../Tasks/02-theme-changer/ThemeChanger'
import CounterConstraints from '../../Tasks/03-counter-constraints/CounterConstraints'
import MultiStepForm from '../../Tasks/04-multi-step-form/MultiStepForm'
import LoginToggle from '../../Tasks/05-login-toggle/LoginToggle'
import UserList from '../../Tasks/06-user-list/UserList'
import EventTracker from '../../Tasks/07-EventTracker/EventTracker'
import SignUp from '../../Tasks/08-SignUpForm/SignUp'
const Compiledtasks = () => {
     const users = [
    {
      id: 1,
      name: 'Nirmal',
      email: 'nirmal@example.com',
      role: 'Frontend Developer',
      city: 'Delhi',
      isOnline: true,
      bio: 'Likes building UI.',
    },
    {
      id: 2,
      name: 'Aman',
      email: 'aman@example.com',
      role: 'Backend Developer',
      city: 'Lucknow',
      isOnline: false,
      bio: 'Enjoys APIs and databases.',
    },
  ]
  return (
    <>
          <header className="rounded-xl bg-amber-800 p-6 text-center text-white">
        <h1 className="text-3xl font-bold">Week 2 React Revision Playground</h1>
        <p className="mt-2 text-sm text-amber-100">
          Each completed task is grouped separately so revision stays easy.
        </p>

      </header>
{/* making routes for learning tasks */}


 <section className="space-y-4">
        <h2 className="text-2xl font-semibold">01. User Card</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}

          {/* One direct hardcoded usage is useful for revision:
              it reminds you that reusable components work with any valid props. */}
          <UserCard
            id={3}
            name="Hello"
            email="nothing@example.com"
            role="BE"
            city="City"
            isOnline={false}
            bio="This card is rendered directly to revise props passing."
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">02. Theme Changer</h2>
        <ThemeChanger />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">03. Counter Constraints</h2>
        <CounterConstraints />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">04. Multi Step Form</h2>
        <MultiStepForm />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">05. Login Toggle</h2>
        <LoginToggle />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">06. User List</h2>
        <UserList />
      </section>

      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">07. Event Tracker</h2>
       <EventTracker/>
      </section>

        <section className="space-y-4">
        <h2 className="text-2xl font-semibold">08. Controlled Forms</h2>
       <SignUp/>
      </section>
    
    </>
  )
}

export default Compiledtasks