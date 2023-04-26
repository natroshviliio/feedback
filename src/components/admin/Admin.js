import React, { useEffect, useState } from "react";
import Statistic from "./Statistic";
import Questions from "./Questions";
import { Link } from "react-router-dom";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    const _loggedIn = localStorage.getItem("loggedIn");
    if (_loggedIn === undefined) {
      localStorage.setItem("loggedIn", false);
      setLoggedIn(false);
    } else {
      console.log(_loggedIn);
      setLoggedIn(_loggedIn === "true" ? true : false);
    }
  }, []);

  const handleToggle = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const checkPassword = () => {
    if (userPassword === "1234") {
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
    }
  };

  if (loggedIn === false) {
    return (
      <div className="home_container">
        <div className="password_container">
          <div className="password">
            <div className="input_container">
              <input
                className="my_txt"
                type={passwordVisibility ? "text" : "password"}
                placeholder="შეიყვანეთ პაროლი..."
                onChange={(e) => setUserPassword(e.target.value)}
              />
              <div className="icon_container" onClick={handleToggle}>
                {passwordVisibility ? <BsEyeFill /> : <BsEyeSlashFill />}
              </div>
            </div>

            <button className="my_btn" onClick={checkPassword}>
              {" "}
              პაროლის შეყვანა
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (loggedIn === true) {
    return (
      <div className="home_container">
        <div className="home">
          <Link to="/statistic" className="child_container">
            სტატისტიკა
          </Link>
          <Link to="/questions" className="child_container">
            კითხვები
          </Link>
          <Link to="/" className="child_container">
            მთავარი
          </Link>
        </div>
      </div>
    );
  }
};

export default Admin;
