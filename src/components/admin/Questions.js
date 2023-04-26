import React, { useState, useEffect } from "react";
import "../Style/style.css"
import Rate from "../Rate";
import axios from "axios";

const Questions = ({ currentIndex, setCurrentIndex, questions, votes, setVotes, generateUserId }) => {

  const [rateTimer, setRateTimer] = useState(null);
  const [timer, setTimer] = useState(15);

  const addQuestionHistory = async () => {
    await axios.post("http://192.168.43.210:5000/addquestionhistory", votes)
      .then(res => res.status === 200 && true)
      .catch(err => console.log(err));
  }

  useEffect(() => {
    clearInterval(rateTimer);
    setRateTimer(null);
    setTimer(15);
    if (currentIndex > 0) {
      setRateTimer(
        setInterval(() => {
          setTimer(timer - 1);
        }, 1000)
      );
    }
  }, [currentIndex]);

  useEffect(() => {
    clearInterval(rateTimer);
    setRateTimer(null);
    if (timer === 0) {
      clearInterval(rateTimer);
      setRateTimer(null);
      setTimer(15);
      setCurrentIndex(0);
      addQuestionHistory();
      generateUserId();
      setVotes([]);
    }
    else if (rateTimer) {
      setRateTimer(
        setInterval(() => {
          setTimer(timer - 1);
        }, 1000)
      );
    }
  }, [timer]);

  if (questions[currentIndex]) {
    return (
      <div className="questions_width_rate" style={{ paddingRight: rateTimer ? 0 : 5 }}>
        <span className="questions_with_rate_span">
          {currentIndex + 1}<span style={{ fontSize: ".7rem", letterSpacing: 3 }}>/</span>{questions.length}
        </span>
        <p>{questions[currentIndex]?.question}</p>
        {rateTimer && (
          <div className="feedback_timer">
            {timer}
          </div>
        )}
      </div>
    );
  }
};

export default Questions;
