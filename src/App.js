import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [isOn, setIsOn] = useState(false);

  const [entry, setEntry] = useState("");

  const [list, setList] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText ] = useState("");

  const [error, setError] = useState("");

  const isSaveDisabled = entry.trim() === "";


  const updateItem = (id) => {
    const updatedList = list.map(item => item.id === id ? { ...item, text: editingText} : item);

    setList(updatedList);
    setEditingId(null);
    setEditingText("");
  };
  const handleSave = () => {
    if(entry.trim() === "")
    {
      setError("You need enter some text!!");
      return;//corta la funcion
    }
    
    const newEntry = {id: uuidv4(), text: entry}
    setList([...list, newEntry]);
    setEntry("");
    setError("");
    
  };

  const deleteItem = (id) => {
    //que elementos queremos que se quede, por eso usamos !==
    const newList = list.filter(item => item.id !== id);
    setList(newList);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>The light is {isOn ? "ON 💡" : "OFF 🌑"}</h1>
           
      <h3>Write about your baby's day:</h3>
      
      <input 
        type="text" 
        placeholder="Example: I fed the baby"
        value={ entry } // 1. ¿Qué variable va aquí?
        onChange={(e) => setEntry(e.target.value)} // 2. ¿Qué función actualiza el estado?
      />
      {error && <p style={{ color:'red' }}>{error}</p> }
     
      <button onClick={handleSave}
              disabled = {isSaveDisabled}
      >
        Save memory
      </button>
      <p>Preview of your diary: <strong>{ entry }</strong></p>
    <ul>
  {list.map(item => (
    <li key={item.id}>
      {editingId === item.id ? (
        <>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
          />
          <button onClick={() => updateItem(item.id)}>Save</button>
        </>
      ) : (
        <>
          {item.text}
          <button onClick={() => {
            setEditingId(item.id);
            setEditingText(item.text);
          }}>
            Edit
          </button>
          <button onClick={() => deleteItem(item.id)}>X</button>
        </>
      )}
    </li>
  ))}
</ul>
    </div>

  );
}

export default App;
