import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../service/usersService";
import { toast } from "react-toastify";

type ModalProps = {
  handleClose: () => void;
  show: boolean;
  userDeleteData: IUser;
  handleDeleteUser: (user: IUser) => void;
};

function ModalConfirm(props: ModalProps) {
  const { handleClose, show, userDeleteData, handleDeleteUser } = props;

  const confirmDelete = async () => {
    const res = await deleteUser(userDeleteData.id);
    if (res && +res.status === 204) {
      toast.success("Delete successfully");
      handleDeleteUser(userDeleteData);
      handleClose();
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <p className="mr-3">Are you sure to delete email:</p>
            <p className="font-weight-bold">{userDeleteData.email}?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalConfirm;
