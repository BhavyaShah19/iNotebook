import React, { useContext, useState } from "react";
import notesContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(notesContext);
  const { addnote } = context;

  const [note, setnote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    props.showalert("Note Added SuccessFully", "success")

  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container" style={{ 'marginTop': '4rem' }}>
      <h1>Add a Note</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            minLength={5}
            required
            aria-describedby="emailHelp"
            placeholder="Enter Title"
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            minLength={5}
            required
            className="form-control"
            id="description"
            name="description"
            placeholder="Descriptipn"
            onChange={onchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            minLength={5}
            required
            placeholder="Tag"
            onChange={onchange}
          />
        </div>
        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
