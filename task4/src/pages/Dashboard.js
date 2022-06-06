import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import withAuth from "../components/withAuth";
import "react-table/react-table.css";

const checkedList = [];

var click = 0;

const Dashboard = () => {
  const [data, getData] = useState([]);
  const [isChecked, setIsChecked] = useState(null);

  const URL = "https://pool.energy/apiv2/users";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(URL)
      .then((res) => res.json())

      .then((response) => {
        getData(response);
      });
  };

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      checkedList.push(`${value}`);
      console.log(checkedList);
    } else {
      checkedList.splice(checkedList.indexOf(`${value}`), 1);
      console.log(checkedList);
    }
  };

  const handleOnChange = () => {
    click++;
    if (click % 2 === 0) {
      setIsChecked(false);
      setIsChecked(null);
      checkedList.splice(0, checkedList.length);
    } else {
      setIsChecked(true);
      for (var i = 0; i < data.length; i++) {
        checkedList.push(data[i].user_id);
        console.log(checkedList);
      }
    }
  };

  const banClick = (event) => {
    fetch("https://pool.energy/apiv2/ban", {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: checkedList }),
    });
    alert("Banned");
    fetchData();
    window.location.reload();
  };

  const unbanClick = (event) => {
    event.preventDefault();
    fetch("https://pool.energy/apiv2/unban", {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: checkedList }),
    });
    alert("UnBanned");
    fetchData();
    window.location.reload();
  };

  const remove = (event) => {
    event.preventDefault();
    fetch("https://pool.energy/apiv2/remove", {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: checkedList }),
    });
    alert("Removed");
    fetchData();
    window.location.reload();
  };

  const { name } = useParams();

  if (localStorage.getItem("token") !== null) {
    fetch("https://pool.energy/apiv2/usercheck", {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name }),
    }).then((response) => {
      if (response.status === 200) {
      } else {
        localStorage.removeItem("token");
      }
    });
  }

  return (
    <div>
      <h1 className="title is-1">This is the Dashboard Page</h1>
      <article className="message is-dark" style={{ marginTop: 40 }}>
        <div className="message-header">
          <p>
            <span className="welcomeDashboard">Welcome to Dashboard User:</span>{" "}
            {name}
          </p>
        </div>
      </article>
      <button id="button" className="button " onClick={handleOnChange}>
        Select All
      </button>
      <button onClick={banClick} className="button ban marginleft ">
        Block
      </button>
      <button onClick={unbanClick} className="button marginleft">
        <img className="iconBlock" src="/unblock.png"></img>
      </button>
      <button onClick={remove} className="button marginleft">
        <img className="iconBlock" src="/remove.png"></img>
      </button>
      <table className="table">
        <tbody>
          <tr>
            <th>Select</th>
            <th>User Id</th>
            <th>Id</th>
            <th>Is Banned?</th>
            <th>registration_date</th>
            <th>last_login</th>
          </tr>
          {data.map((item, i) => (
            <tr key={i}>
              <td>
                <input
                  id={item.user_id}
                  type="checkbox"
                  value={item.user_id}
                  onChange={handleChange}
                  checked={isChecked}
                />
              </td>
              <td>{item.user_id}</td>
              <td>{item.user_name}</td>
              <td className="isbanned">{item.isbanned}</td>
              <td>{item.registration_date}</td>
              <td>{item.last_login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(Dashboard);
