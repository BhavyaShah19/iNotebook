import React, { useContext } from "react";
import notesContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(notesContext);
  const { deletenote } = context;

  const { note, updatenote } = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa fa-trash-o mx-2"
            onClick={() => {
              deletenote(note._id);
              props.showalert("Note Deleted SuccessFully", "success")

            }}
            style={{ fontSize: "24px" }}
          ></i>
          <i
            className="fa fa-edit mx-2"
            onClick={() => {
              updatenote(note);
            }}
            style={{ fontSize: "24px" }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
