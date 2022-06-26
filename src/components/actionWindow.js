import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActionWindow(props) {
  const { actionWindowOff, actionWindowToggle, article, name, commit, action } =
    props;

  function completeAction(e) {
    action(e);
    actionWindowOff();
  }

  function startAction(action) {
    actionWindowToggle(action, article._id);
  }

  return commit ? (
    <div id={article._id} className={"completeAction"}>
      <p>{`Click OK to ${name}`}</p>
      <button onClick={completeAction}>OK</button>
      <button onClick={actionWindowOff}>Go Back</button>
    </div>
  ) : (
    <div className="actionDiv">
      <button onClick={() => startAction("publish")}>
        {article.published ? "Unpublish" : "Publish"}
      </button>
      <DeleteIcon onClick={() => startAction("delete")} />
    </div>
  );
}
