import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";
import notesContext from "../context/notes/noteContext";
import { useHistory } from "react-router";

const Notes = (props) => {
  const context = useContext(notesContext);
  let history = useHistory();

  const ref = useRef(null);

  const refclose = useRef(null);


  const { notes, getnote, editnote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getnote();
    }
    else {
      history.push('/login')
    }

  }, []);

  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });


  const updatenote = (note) => {
    ref.current.click();
    setnote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag })
  };

  const handleclick = (e) => {
    console.log("Updating the note", note);
    editnote(note.id, note.etitle, note.edescription, note.etag)
    refclose.current.click();
    props.showalert("Note Updated SuccessFully", "success")

  };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote showalert={props.showalert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {" "}
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    placeholder="Enter Title"
                    minLength={5}
                    required
                    onChange={onchange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Description</label>
                  <input
                    type="text"
                    value={note.edescription}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    minLength={5}
                    required
                    placeholder="Descriptipn"
                    onChange={onchange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="edescription">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.etag}
                    id="etag"
                    minLength={5}
                    required
                    name="etag"
                    placeholder="Tag"
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                ref={refclose}
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={handleclick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Your notes</h1>
      <div className="row my-3">
        {notes.length === 0 && "No notes to display"}
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showalert={props.showalert} updatenote={updatenote} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
