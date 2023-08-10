import { useState } from "react";

export default function TodoSettings({ todos, emptyList, saveList, onSubmit }) {
  const [newList, setNewList] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    if (newList === "") return;

    console.log(newList)

    onSubmit(newList);

    setNewList("")
  }

  //TODO: Send in name with saveList
  return (
    <>
     <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="list">New list:</label>
        <input
          value={newList}
          onChange={e => setNewList(e.target.value)}
          type="text"
          id="list"
        />
      </div>
      {/* <button className="btn">Create list</button> */}

    <div className="settings-buttons">
      <button className="clear-all-btn" onClick={emptyList}>
        Clear todos
      </button>

      {/* onClick={() => saveList(newList, todos)} */}
      <button className="save-btn" >
        Save list
      </button>
    </div>
    </form> 
    </>
  );
}
