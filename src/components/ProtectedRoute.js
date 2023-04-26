import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(false);

  const getQuestions = async () => {
    await axios.get("http://192.168.43.210:5000/getquestions")
      .then(res => {
        if (res.status === 200) {
          if (res.data.length === 0) {
            navigate("/");
          } else {
            setQuestions(true);
          }
        }
      })
      .catch(err => {
        console.log(err.request.status);
        navigate("/");
      })
  }

  useEffect(() => {
    getQuestions();
  }, []);

  if (questions) return <Outlet />;
};

export default ProtectedRoute;
