import { useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import classes from "./AddItemForm.module.css";

const AddItemForm = (props) => {
  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const imageInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredIamge = imageInputRef.current;

    let formData = new FormData();
    formData.append('Name', enteredName);
    formData.append('Price', enteredPrice);
    formData.append('Image', enteredIamge.files[0]);

    props.addItem(formData);
  };

  return (
    <div>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Item</Modal.Title>
        </Modal.Header>
        <form onSubmit={submitHandler}>
          <Modal.Body>
            <div className={classes.control}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                required
                placeholder="Please Input Name Item"
                ref={nameInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                required
                placeholder="Please Input Price"
                ref={priceInputRef}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="img">Image</label>
              <input type="file" id="img" required ref={imageInputRef} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default AddItemForm;
