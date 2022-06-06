import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Navbar = ({ history }) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  var nameRedirect;

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://pool.energy/apiv2/register", {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name, password: password }),
    });
    alert("You are Registered please log in!");
    setIsOpen(false);
    setIsOpen2(true);
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    fetch("https://pool.energy/apiv2/login", {
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        password: password,
        lastLogin: new Date().toLocaleString(),
      }),
    }).then((response) => {
      if (response.status === 200) {
        alert("You are logged in!");
        setIsOpen2(false);
        localStorage.setItem("token", "sucesstoken");
        nameRedirect = name;
        localStorage.setItem("nameRedirect", nameRedirect);
        history.push("/Dashboard/" + nameRedirect);
        window.location.reload();
      } else {
        alert("Wrong username or password or you are banned!");
      }
    });
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen2(true);
  }

  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  const [isOpen, setOpen] = useState(false);

  const isAuth = !!localStorage.getItem("token");

  const logoutUser = () => {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  };

  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/"
              exact
            >
              Home
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to={"/Dashboard/" + localStorage.nameRedirect + "/"}
            >
              Dashboard
            </NavLink>
          </div>

          <div className="navbar-end">
            <div className="navbar-item buttonNav">
              <div className="buttons">
                {!isAuth ? (
                  <div>
                    <button className="button is-black" onClick={openModal2}>
                      Login
                    </button>
                    <Modal
                      isOpen={modalIsOpen2}
                      onAfterOpen={afterOpenModal2}
                      onRequestClose={closeModal2}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <button className="button" onClick={closeModal2}>
                        X
                      </button>
                      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Login</h2>
                      <form onSubmit={handleSubmit2}>
                        <input
                          type="text"
                          value={name}
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          className="field"
                          type="text"
                          value={password}
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="button" type="submit">
                          Login
                        </button>
                      </form>
                    </Modal>
                  </div>
                ) : (
                  <button className="button is-black" onClick={logoutUser}>
                    Log out
                  </button>
                )}
              </div>
              <div className="buttons">
                {!isAuth ? (
                  <div>
                    <button className="button is-white" onClick={openModal}>
                      Register
                    </button>
                    <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <button className="button" onClick={closeModal}>
                        X
                      </button>
                      <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                        Register
                      </h2>
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          value={name}
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="text"
                          value={password}
                          placeholder="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="button" type="submit">
                          Create
                        </button>
                      </form>
                    </Modal>
                  </div>
                ) : (
                  console.log("logged in")
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
