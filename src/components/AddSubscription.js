import React from 'react'
import Axios from "axios";
import { apiUrl } from "./Calendar";
import { SubscriptionContext } from "../SubscriptionContext";
import { useContext, useState } from "react";


function AddSubscription() {

    const { listOfSubscriptions, setListOfSubscriptions } =
    useContext(SubscriptionContext);


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [recurrency, setRecurrency] = useState("");
  
    const createSubscription = () => {
      Axios.post(`${apiUrl}/createSubscription`, {
        name,
        price,
        start,
        end,
        recurrency,
      }).then((response) => {
        // add subscription immediately to calendar once you click sumbit button
        setListOfSubscriptions([
          ...listOfSubscriptions,
          { name, price, start, end, recurrency },
        ]);
        alert("SUBSCRIPTION ADDED SUCCESSFULLY");
      } );
    };

      // close popup
  const closeAddSubscription = () => {
    document.getElementById("add-subscription-popup").style.display = "none";
  };
  return (
    <aside>
        <div id="add-subscription-popup">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            id="close-popup"
            onClick={closeAddSubscription}
          >
            X
          </button>
          <div className="add-susbcription-form">
            <div>
              Subscription
              <input
                type="text"
                placeholder="Subscription name..."
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div>
              Price<br></br>
              <input
                type="number"
                placeholder="Price..."
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div>
              {" "}
              Start date<br></br>
              <input
                type="date"
                placeholder="Start date..."
                onChange={(event) => {
                  setStart(event.target.value);
                }}
              />
            </div>
            <div>
              End date<br></br>
              <input
                type="date"
                placeholder="End date..."
                onChange={(event) => {
                  setEnd(event.target.value);
                }}
              />
            </div>
            <div>
              Recurrence
              <input
                type="text"
                id="myInput"
                list="suggestions"
                placeholder="Recurrence..."
                onChange={(event) => {
                  setRecurrency(event.target.value);
                }}
              />
            </div>
            <datalist id="suggestions">
              {/* <option value="weekly">Every week</option> */}
             <option value="monthly">Every month</option>
          {/* <option value="yearly">Every year</option> */}
            </datalist>
            <button
              onClick={() => {
                createSubscription();
                closeAddSubscription();
              }}
            >
              Add subscription
            </button>
          </div>
        </div>
      </aside>
  )
}

export default AddSubscription