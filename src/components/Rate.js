import "./Style/style.css";
import { BsEmojiAngryFill } from "react-icons/bs";
import { ImSad2 } from "react-icons/im";
import { BsFillEmojiNeutralFill } from "react-icons/bs";
import { BsEmojiSmileFill } from "react-icons/bs";
import { ImHappy2 } from "react-icons/im";
import { generatePath, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Questions from "./admin/Questions";
import axios from "axios";
import ThankYou from "./ThankYou";
const Rate = ({ setCurrentIndex, currentIndex }) => {
  const [questions, setQuestions] = useState([]);
  const [isThankyou, setIsThankyou] = useState(false);
  const [userId, setUserId] = useState(null);
  const [votes, setVotes] = useState([]);
  const userString = [..."qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789"].sort();

  const getQuestions = async () => {
    await axios.get("http://192.168.43.210:5000/getquestions")
      .then(res => {
        if (res.status === 200) {
          setQuestions(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const generateUserId = () => {
    setUserId(Array.from({ length: 32 }, () => userString[Math.floor(Math.random() * userString.length)]).join(''));
  }

  useEffect(() => {
    getQuestions();
    generateUserId();
  }, []);

  const handleCurrentIndex = (voteId, questionId) => {
    if (currentIndex < questions.length) {
      const click = new Audio();
      click.src = "./sound/click2.mp3";
      click.currentTime = 0.03;
      click.play();
      click.onended = () => {
        setCurrentIndex(currentIndex + 1);
        handleQuestionVote(voteId, questionId);
      }
    }

  };

  const addQuestionHistory = async () => {
    await axios.post("http://192.168.43.210:5000/addquestionhistory", votes)
      .then(res => res.status === 200 && true)
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if (questions.length > 0 && (currentIndex === questions.length)) {
      const click = new Audio();
      click.src = "./sound/click.mp3";
      click.volume = 0.5;
      click.currentTime = 0.28;
      click.play();
      click.onplaying = () => {
        setIsThankyou(true);
        setTimeout(() => {
          setIsThankyou(false);
          setCurrentIndex(0);
          generateUserId();
          console.log(votes);
          addQuestionHistory();
          setVotes([]);
        }, 3000);
      }
    }
  }, [currentIndex]);

  const rateEmojies = [
    {
      emoji: <BsEmojiAngryFill />,
    },
    {
      emoji: <ImSad2 />,
    },
    {
      emoji: <BsFillEmojiNeutralFill />,

    },
    {
      emoji: <BsEmojiSmileFill />,
    },
    {
      emoji: <ImHappy2 />,
    },
  ];

  const handleQuestionVote = (voteId, questionId) => {
    setVotes([
      ...votes, {
        userId: userId,
        questionId: questionId,
        voteId: voteId,
      }
    ])
  };

  const [fullscreenCounter, setFullscreenCounter] = useState(0);
  const [fullscreenTimeout, setFullscreenTimeout] = useState(null);
  const handleFullScreen = () => {
    clearTimeout(fullscreenTimeout);
    setFullscreenCounter(fullscreenCounter + 1);

    setFullscreenTimeout(
      setInterval(() => {
        setFullscreenCounter(0);
      }, 3000));
  }

  useEffect(() => {
    if (fullscreenCounter === 5) {
      const rateWindow = document.querySelector(".feedback");
      if (rateWindow.requestFullscreen) {
        rateWindow.requestFullscreen();
      } else if (rateWindow.webkitRequestFullscreen) {
        rateWindow.webkitRequestFullscreen();
      } else if (rateWindow.msRequestFullscreen) {
        rateWindow.msRequestFullscreen();
      }

      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
      } else if (document.msRequestFullscreen) {
        document.msRequestFullscreen();
      }

      setFullscreenCounter(0);
    }
  }, [fullscreenCounter]);



  return (
    <div className="feedback">
      {isThankyou && <ThankYou />}
      {!isThankyou && (
        <>
          <div style={{ width: 130, height: 130, backgroundColor: "transparent", position: "absolute", right: 0, top: 0 }}
            onClick={handleFullScreen}></div>
          <Questions currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} questions={questions} votes={votes} setVotes={setVotes} generateUserId={generateUserId} />
          <div className="rate">
            {questions[currentIndex]?.rates?.map((x, i) => {
              return (
                <div key={i} className="icon_container"
                  onClick={() => handleCurrentIndex(x.Id, questions[currentIndex].Id)}>
                  <div
                    className="icon"
                    style={{ cursor: "pointer" }}
                  >
                    {rateEmojies[x.iconIndex].emoji}
                  </div>
                  <div className="score">{x.text}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Rate;
