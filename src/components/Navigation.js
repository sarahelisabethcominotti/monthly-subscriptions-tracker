import React from "react";
import { Link } from "react-router-dom";
import AddSubscription from "./AddSubscription";

function Navigation() {

  // open popup
  //   openAddSubscription.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     addSubscriptionForm.style.display = "flex";
  //   });
  const openAddSubscription = () => {
    document.getElementById("add-subscription-popup").style.display = "flex";
  };



  return (
    <>
      <header className="App-header">
        <button className="header-icon" onClick={openAddSubscription}>
          <span className="material-symbols-rounded" id="add">
            add
          </span>
        </button>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <p>My Monthly Subscriptions</p>
        </Link>
        <Link to="/stats">
          <button className="header-icon">
            <span className="material-symbols-rounded">bar_chart</span>
          </button>
        </Link>
      </header>
      <AddSubscription/>
    </>
  );
}

export default Navigation;
