import { FaUserAlt } from "react-icons/fa";
import { BsStarFill, BsStarHalf, BsStar, BsEmojiAngryFill, BsFillEmojiNeutralFill, BsEmojiSmileFill } from "react-icons/bs";
import { ImHappy2, ImSad2 } from "react-icons/im";
import { useEffect, useState } from "react";
import axios from "axios";
const Statistic = () => {

    const [countOfVotesData, setCountOfVotesData] = useState(null);
    const [countOfVotes, setCountOfVotes] = useState(0);
    const [rating, setRating] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const getCountOfVotesData = async () => {
        await axios.get(`http://192.168.43.210:5000/countofvotesoneachquestion?startDate=${startDate}&endDate=${endDate}`)
            .then(res => {
                if (res.status === 200) {
                    setCountOfVotesData(res.data);
                }
            })
            .catch(err => console.log(err));
    }
    const getCountOfVotes = async () => {
        await axios.get(`http://192.168.43.210:5000/countofvotes?startDate=${startDate}&endDate=${endDate}`)
            .then(res => {
                if (res.status === 200) {
                    setCountOfVotes(res.data.votesCount);
                }
            })
            .catch(err => console.log(err));
    }

    const getRating = async () => {
        await axios.get(`http://192.168.43.210:5000/rating?startDate=${startDate}&endDate=${endDate}`)
            .then(res => {
                if (res.status === 200) {
                    setRating(res.data)
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getCountOfVotesData();
        getCountOfVotes();
        getRating();
    }, []);

    useEffect(() => {
        console.log(startDate);
    }, [startDate]);

    const filterWithDate = () => {
        getCountOfVotesData();
        getCountOfVotes();
        getRating();
    }

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
    return (
        <div className="statistic2">
            <div className="filter_container">
                <div className="date_container">
                    დაწყება
                    <input type="date" min={countOfVotesData?.minDate} max={countOfVotesData?.maxDate} value={startDate} onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="date_container">
                    დასრულება
                    <input type="date" min={countOfVotesData?.minDate} max={countOfVotesData?.maxDate} value={endDate} onChange={e => setEndDate(e.target.value)} />
                </div>
                <div className="filter_with_date">
                    <button className="datefilter_button" onClick={filterWithDate}>გაფილტვრა</button>
                </div>
            </div>
            <div className="rating_container">
                <div className="rating_count">
                    <div className="rating_count_text">გამოკითხული მომხმარებლები</div>
                    <div className="rating_count_icon"><FaUserAlt /></div>
                    <div className="rating_count_value">{countOfVotes}</div>
                </div>
                <div className="rating_stars_container">
                    {rating && rating.sort((a, b) => b.question.length - a.question.length).map(x => {
                        return (
                            <div key={x.Id} className="each_rating_stars">
                                <div className="rating_question">{x.question}</div>
                                <div className="rating_each_stars_container">
                                    {x.rates.map((y, i) => {
                                        console.log(y);
                                        return (
                                            <div key={y.Id} className="rating_stars">
                                                {(x.rating >= y.vote) ? <BsStarFill /> : x.rating >= y.vote - 0.5 ? <BsStarHalf /> : <BsStar />}
                                            </div>
                                        )
                                    })}
                                    {x.rating}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="rating_container_with_questions">
                {countOfVotesData?.countOfVotes && countOfVotesData.countOfVotes.map(x => {
                    return (
                        <div key={x.Id} className="rating_container_each_rate">
                            <div className="rating_container_each_rate_question">
                                {x.question} - სულ({x.sumOfVotes})
                            </div>
                            <div className="rating_container_each_rate_rates">
                                {x.votes.map(y => {
                                    return (
                                        <div key={y.Id} className="rating_container_each_rate_rates_block">
                                            <div className="rating_container_block_answer">
                                                {y.text}
                                            </div>
                                            <div className="rating_container_block_rate">
                                                <div className="rating_container_block_rate_icon">
                                                    {rateEmojies[y.iconIndex].emoji}
                                                </div>
                                                <div className="rating_container_block_rate_rate">
                                                    {y.countOnEachAnswer}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Statistic