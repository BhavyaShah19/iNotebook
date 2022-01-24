import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  //Fetch Notes
  const getnote = async () => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };

  //Add Note
  const addnote = async (title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      _id: "6139f3b1283ef8de8befa235",
      user: "6139f202283ef8de8befa218",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-09T11:44:49.418Z",
      __v: 0,
    };
    setnotes(notes.concat(note));
  };

  //Delete Note
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(),
    });
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newnotes);
  };

  //Edit Note
  const editnote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = response.json();

    let newnotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break
      }
    }
    setnotes(newnotes)
  };
  return (
    <NoteContext.Provider
      value={{ notes, addnote, deletenote, editnote, getnote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
