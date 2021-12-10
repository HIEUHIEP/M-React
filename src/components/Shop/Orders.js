import { Table } from "react-bootstrap";

const Orders = (props) => {
  return (
    <div>
      {props.data.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Total Price</th>
              <th>Status Order</th>
              <th>Time Order</th>
            </tr>
          </thead>

          <tbody>
            {props.data.map((item, index) => (
              <tr data-index={index}>
                <td>{item.orderId}</td>
                <td>{item.customerName}</td>
                <td>{item.customerPhoneNumber}</td>
                <td>{item.totalPrice}</td>
                <td>{item.status ? item.status : "unconfimred"}</td>
                <td>
                  {new Date(item.orderTime).toLocaleDateString()} -{" "}
                  {new Date(item.orderTime).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {props.data.length === 0 && <p>List is empty</p>}
    </div>
  );
};

export default Orders;
