import React, { useEffect, useState } from "react";
import "./Style/style.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { BsArrowsFullscreen, BsEmojiAngryFill, BsEmojiSmileFill, BsFillEmojiNeutralFill, BsFullscreenExit } from "react-icons/bs";
import { ImHappy2, ImSad2 } from "react-icons/im";
import { IoChevronBack } from "react-icons/io5"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddQuestions = () => {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [texts, setTexts] = useState([]);
  const [rates, setRates] = useState([
    {
      iconIndex: 0,
      vote: 1,
      text: "",
      element: <BsEmojiAngryFill className="rate_icon" />
    },
    {
      iconIndex: 1,
      vote: 2,
      text: "",
      element: <ImSad2 className="rate_icon" />
    },
    {
      iconIndex: 2,
      vote: 3,
      text: "",
      element: <BsFillEmojiNeutralFill className="rate_icon" />
    },
    {
      iconIndex: 3,
      vote: 4,
      text: "",
      element: <BsEmojiSmileFill className="rate_icon" />
    },
    {
      iconIndex: 4,
      vote: 5,
      text: "",
      element: <ImHappy2 className="rate_icon" />
    }
  ])
  const [message, setMessage] = useState("");

  const [editedTextId, setEditedTextId] = useState(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    getQuestions();
  }, []);

  const handleAddQuestion = async (e) => {
    if (question && rates.filter(x => x.text).length > 1) {
      await axios.post("http://192.168.43.210:5000/addquestion", {
        question: question,
        isActive: 1,
        activationDate: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
        rates: rates.filter(x => x.text).map(x => { return { vote: x.vote, text: x.text, iconIndex: x.iconIndex } })
      }).then(res => {
        console.log(res.status);
        setQuestion("");
        getQuestions();
      }).catch(err => {
        console.log(err);
      })
    } else {
      setMessage("კითხვისა და მინიმუმ 2 პასუხის შევსება სავალდებულოა!");
      setTimeout(() => {
        setMessage("");
      }, 3500);
    }
  };

  const handleClearAnswers = () => {
    setRates(rates.map(x => {
      return {
        ...x,
        text: x.text = "",
      }
    }));
  }

  const handleChangeRates = (e, i) => {
    const _rates = [...rates];
    _rates[i].text = e.target.value;
    setRates(_rates);
  }

  const handleDeleteQuestion = (id) => {
    const deleteItem = texts.filter((element) => element.id !== id);
    setTexts(deleteItem);
    localStorage.setItem("questions", JSON.stringify(deleteItem));
  };

  const handleEditQuestion = (e, i) => {
    const _texts = [...texts];
    _texts[i].question = e;
    setTexts(_texts);
    localStorage.setItem("questions", JSON.stringify(_texts));
  };


  const [fullscreen, setFullscreen] = useState(false);

  const handleFullScreen = async () => {
    const rateWindow = document.querySelector(".addQuestions");
    if (!fullscreen) {
      rateWindow.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  }

  useEffect(() => {
    const dc = document.getElementById("aq").onscroll = () => {
      const addquestions = document.getElementById("aq").scrollTop;
      if (parseInt(addquestions) >= 70) {
        document.querySelector(".addQuestions_header").style.height = "50px";
        document.querySelectorAll(".headerButton").forEach(x => x.style.width = "40px");
        document.querySelectorAll(".headerButton").forEach(x => x.style.height = "40px");
      }
      if (parseInt(addquestions) <= 50) {
        document.querySelector(".addQuestions_header").style.height = "70px";
        document.querySelectorAll(".headerButton").forEach(x => x.style.width = "50px");
        document.querySelectorAll(".headerButton").forEach(x => x.style.height = "50px");
      }
    }

    return () => document.removeEventListener("scroll", dc);
  }, []);

  return (
    <div className="addQuestions" id="aq">
      <div className="addQuestions_header">
        <div className="addQuestionsHeader_logo"></div>

        <div className="navigateBack headerButton" onClick={() => navigate("/admin")}>
          <IoChevronBack />
        </div>
        <div className="fullscreen headerButton" onClick={handleFullScreen}>
          {fullscreen ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
        </div>
      </div>
      <div className="addQuestions_container">
        <textarea value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="დაამატეთ კითხვა..."></textarea>
      </div>

      <div className="addRateText_container">
        <div className="rateText_container">
          {
            rates.map((x, i) => {
              return (
                <div key={i} className="rate_block">
                  {x.element}
                  <div className="rateInput_container">
                    <textarea className="rate_textArea" value={x.text} onChange={e => handleChangeRates(e, i)} placeholder="პასუხი..."></textarea>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="clearAnswers_container" onClick={handleClearAnswers}>
        <button className="clearAnswers_button">პასუხების გასუფთავება</button>
      </div>

      <div className="addQuestionsButton_container">
        <div className="submit_container">
          <button className="submit" onClick={(e) => handleAddQuestion(e)}>
            დამატება
          </button>
          <div className="submit_animation"></div>
        </div>
      </div>

      <div className="addQuestionsMessage_container">
        {message && (
          <div className="addQuestionsMessage">
            {message}
          </div>
        )}
      </div>

      <div className="questions_container">
        {questions.map((x, i) => {
          return (
            <div key={i} className="each_question_container">
              <div
                className="each_question"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <span style={{ marginRight: "1rem" }}>{i + 1}.</span>{" "}
                {editedTextId === x.id ? (
                  <textarea
                    type="text"
                    value={x.question}
                    onChange={(e) => handleEditQuestion(e.target.value, i)}
                    className="editing"
                  />
                ) : (
                  <p>{x.question}</p>
                )}
              </div>
              <div
                className="mybtn"
                onClick={() =>
                  setEditedTextId(editedTextId ? null : x.id)
                }
              >
                {editedTextId === x.id ? (
                  <AiOutlineCheck />
                ) : (
                  <AiTwotoneEdit />
                )}
              </div>
              <div
                className="mybtn"
                onClick={() => handleDeleteQuestion(x.id)}
              >
                <RiDeleteBin5Fill />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddQuestions;
