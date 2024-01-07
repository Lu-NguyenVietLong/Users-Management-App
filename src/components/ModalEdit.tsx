import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser, putUpdateUser } from "../service/usersService";
import { ToastContainer, toast } from "react-toastify";

type ModalProps = {
  handleClose: () => void;
  handleEdit: (user: { first_name: string; id: number }) => void;
  show: boolean;
  user: IUser;
  //   handleUpdateTable: ({
  //     first_name,
  //     id,
  //   }: {
  //     first_name: string;
  //     id: number;
  //   }) => void;
};

function ModalEdit(props: ModalProps) {
  const { handleClose, show, user, handleEdit } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  useEffect(() => {
    if (show) {
      setName(user.first_name);
    }
  }, [user]);

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job, user.id);
    if (res && res.data && res.data.updatedAt) {
      handleEdit({
        first_name: name,
        id: user.id,
      });
    }
    setJob("");
    toast.success("Update successful");
  };

  const handleCloseEdit = () => {
    handleClose();
    setJob("");
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
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
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEdit;
