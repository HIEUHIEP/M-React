import { useState, useContext, useEffect } from "react";

import classes from "./ShopViewMenu.module.css";
import URL_API from "../../serve/url";
import AuthContext from "../../store/auth-context";
import { Button, Spinner } from "react-bootstrap";

import Menu from "./Menu";
import Orders from "./Orders";
import AddItemForm from "./AddItemForm";

const ShopViewMenu = (props) => {
  const authCtx = useContext(AuthContext);
  const [isBusy, setBusy] = useState(true);
  const [shopInfo, setshopInfo] = useState({});
  const [ordersList, setOrderList] = useState({});
  const [isViewMenu, setView] = useState(true);
  const [show, setShow] = useState(false);
  const [listItem, setListItem] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    //getShopInfo();
  }, []);

  // Call API to get shop infor and list items
  const getShopInfo = () => {
    setBusy(true);
    const urlAPi = `${URL_API}/api/Shop/${authCtx.token}`;
    fetch(urlAPi, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Error!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setshopInfo(data);
        const listItem = data.items.filter((item) => item.isActive);
        setListItem(listItem);
        setBusy(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Call API to get list orders
  const getOrdersList = () => {
    setBusy(true);
    const urlAPi = `${URL_API}/api/Order/${authCtx.token}/shop/all`;
    fetch(urlAPi, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Error!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setOrderList(data);
        setBusy(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Call API to add new item
  const addItem = (enteredDataItem) => {
    setBusy(true);
    enteredDataItem.append("ShopId", authCtx.token);
    const urlAPi = `${URL_API}/api/Item/create`;
    fetch(urlAPi, {
      method: "POST",
      body: enteredDataItem,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Error!";
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        getShopInfo();
      })
      .catch((err) => {
        alert(err.message);
      });
    handleClose();
  };

  // Call API to remove item
  const deleteItem = (enteredItemId) => {
    setBusy(true);
    const urlAPi = `${URL_API}/api/Item`;
    fetch(urlAPi, {
      method: "DELETE",
      body: JSON.stringify({
        ItemId: enteredItemId,
        shopId: authCtx.token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Error!";
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        getShopInfo();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // Call API to remove item
  const updateItem = (enteredItemInput) => {
    setBusy(true);
    const urlAPi = `${URL_API}/api/Item`;
    fetch(urlAPi, {
      method: "PUT",
      body: JSON.stringify({
        itemId: enteredItemInput,
        shopId: authCtx.token,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication Error!";
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        getShopInfo();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const copyShopLink = (event) => {
    const url =
      event.target.value === "0"
        ? `${window.location.protocol}${window.location.host}/admin/${authCtx.token}`
        : `${window.location.protocol}${window.location.host}/shop/${authCtx.token}`;
    navigator.clipboard.writeText(url);
  };

  const toggleView = () => {
    if (isViewMenu) getOrdersList();
    else getShopInfo();
    setView((prevState) => !prevState);
  };

  return (
    <div className={classes.wrap}>
      <h1>
        Welcome to{" "}
        <a className={classes.shopName} href={`/admin/${authCtx.token}`}>
          {shopInfo.name}
        </a>{" "}
        shop
      </h1>
      <div className={classes.wrapBtn}>
        <div>
          <Button variant="danger" value="0" onClick={copyShopLink}>
            Copy link shop
          </Button>{" "}
        </div>
        <Button variant="dark" value="1" onClick={toggleView}>
          View {isViewMenu ? "Orders" : "Menu"}
        </Button>
      </div>
      {!isBusy && (
        <div className={classes.shopView}>
          <div className={classes.listContent}>
            <div className={classes.listContent__header}>
              <p className={classes.listContent__title}>
                List {isViewMenu ? "Menu" : "Orders"}
              </p>
              {isViewMenu && (
                <Button variant="primary" onClick={handleShow}>
                  Add new item
                </Button>
              )}
            </div>
            {isViewMenu && (
              <Menu
                data={listItem}
                deleteItem={deleteItem}
                updateItem={updateItem}
              />
            )}
            {!isViewMenu && (
              <Orders
                data={ordersList.orders}
              />
            )}
          </div>
        </div>
      )}
      {isBusy && (
        <div className={classes.spiner}>
          <Spinner animation="border" variant="danger" />
        </div>
      )}
      <AddItemForm
        handleClose={handleClose}
        addItem={addItem}
        show={show}
      ></AddItemForm>
    </div>
  );
};

export default ShopViewMenu;
