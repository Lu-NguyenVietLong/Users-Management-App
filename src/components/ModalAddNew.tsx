import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../service/usersService";
import { ToastContainer, toast } from "react-toastify";

type ModalProps = {
  handleClose: () => void;
  show: boolean;
  handleUpdateTable: ({
    first_name,
    id,
  }: {
    first_name: string;
    id: number;
  }) => void;
};

function ModalAddNew(props: ModalProps) {
  const { handleClose, show, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    console.log("chekc", res);
    if (res && res.data && res.data.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Create user successfully");
      handleUpdateTable({ first_name: name, id: res.data.id });
    } else {
      toast.error("Create user fail");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Job</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAddNew;
