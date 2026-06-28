import { useState } from "react";

/*
  Task 07 - Event Tracker

  Why this task exists:
  - practice event handling
  - track multiple pieces of related state
  - see how one event can update many UI sections at once
*/

/*
  Reusable button component

  This component does not manage state.
  It only receives data through props:
  - text = button label
  - colour = Tailwind background class
  - clickHandler = function to run when clicked
*/
const CustomButton = ({ text, clickHandler, colour }) => {
  return (
    <button className={`${colour} p-2 m-4`} onClick={clickHandler}>
      {text}
    </button>
  );
};

const EventTracker = () => {
  /*
    clicks = total number of button clicks

    Starts from 0.
    Every button click increases it by 1.
  */
  const [clicks, setClicks] = useState(0);

  /*
    lastAction = latest clicked button action

    Initially "None" because user has not clicked anything yet.
  */
  const [lastAction, setLastAction] = useState("None");

  /*
    history = list of all clicked actions

    Example after clicks:
    ["Saved", "Deleted", "Shared"]
  */
  const [history, setHistory] = useState([]);

  /*
    Common click handler

    Instead of making 3 separate handlers:
    - handleSave
    - handleDelete
    - handleShare

    We made one reusable handler that receives action name.
  */
  const clickHandler = (action) => {
    /*
      Use callback form because new count depends on old count.
    */
    setClicks((prev) => prev + 1);

    /*
      Store latest clicked action.
    */
    setLastAction(action);

    /*
      Add action to history immutably.

      prev = old history
      [...prev, action] = new history with new action added
    */
    setHistory((prev) => [...prev, action]);
  };

  return (
    <>
      <div className="bg-purple-800 text-white p-3 text-4xl text-center">
        Dashboard EventTracker
      </div>

      <div className="flex flex-row justify-center gap-2">
        {/* All three UI blocks below depend on state.
            One click re-renders click count, latest action, and history together. */}
        <p>
          <b>Total Clicks:</b> {clicks}
        </p>

        <p>
          <b>Last Action:</b> {lastAction}
        </p>

        <div>
          <b>History:</b>

          <ol className="flex flex-row">
            {history.map((event, idx) => {
              return (
                <li className="p-1.5" key={idx}>
                  {event}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="flex flex-row justify-center">
        {/*
          Passing data into handler:

          We use arrow function because we need to pass "Saved", "Deleted", etc.

          Correct:
          onClick={() => clickHandler("Saved")}

          Wrong:
          onClick={clickHandler("Saved")}

          Wrong version runs immediately during render.
        */}
        <CustomButton
          text="Save"
          colour="bg-green-500"
          clickHandler={() => clickHandler("Saved")}
        />

        <CustomButton
          text="Delete"
          colour="bg-red-800"
          clickHandler={() => clickHandler("Deleted")}
        />

        <CustomButton
          text="Share"
          colour="bg-purple-500"
          clickHandler={() => clickHandler("Shared")}
        />
      </div>
    </>
  );
};

export default EventTracker;



// Enhancement notes for later:

// 1. Conditional rendering:
//    If history.length === 0, show "No actions yet."
//    Else show history list.

// 2. Add Reset button:
//    clicks = 0
//    lastAction = "None"
//    history = []

// 3. Add timestamp:
//    history item can become object:
//    { id: 1, action: "Saved", time: "10:30 AM" }

// 4. Use better key:
//    Right now index is okay for simple history.
//    Later use unique id for each history item.

// 5. Improve CustomButton prop:
//    Rename clickHandler to onClick.
//    This is more standard React naming.
