
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [email, setemail] = useState('2');
    const [gender, setgender] = useState('3');
    const [question1, setQuestion1] = useState("");
    const [question2, setQuestion2] = useState("");
    const [question3, setQuestion3] = useState("");
    const [response1, setResponse1] = useState("");
    const [response2, setResponse2] = useState("");
    const [response3, setResponse3] = useState("");
    const [lang, setLang] = useState("en");
    const [QuestionNum1, setQuestionNum1] = useState(1);
    const [QuestionNum2, setQuestionNum2] = useState(2);
    const [button, setButton] = useState("Start Survey");
    const getsurvey = async (value) => {

        let Tasks = await axios.get('http://localhost:1337/api/surveys?locale=' + value);
        setQuestion1(Tasks.data.data[0]["attributes"]);
        setQuestion2(Tasks.data.data[QuestionNum1]["attributes"]);
        setQuestion3(Tasks.data.data[QuestionNum2]["attributes"]);
        setQuestionNum1(prev => QuestionNum1 + 2);
        setQuestionNum2(prev => QuestionNum2 + 2);
    }



    const load = (value) => {
        getsurvey(value);
    }

    const [checkbox, setCheckbox] = useState({ box1: "", box2: "", box3: "" });


    const updateBox = (box, value) => {
        if (box === "1") {
            if (checkbox.box1 === value) {
                value = ""
            }
            setCheckbox(previousState => {

                return { ...previousState, box1: value }

            });

        }

        if (box === "2") {
            if (checkbox.box2 === value) {
                value = ""
            }
            setCheckbox(previousState => {
                return { ...previousState, box2: value }
            });
        }
        if (box === "3") {
            if (checkbox.box3 === value) {
                value = ""
            }
            setCheckbox(previousState => {
                return { ...previousState, box3: value }
            });
        }
    }



    const [page, setpage] = useState(0);
    const [page0, set0page] = useState('view');
    const [page1, set1page] = useState('hid');
    const [page2, set2page] = useState('hid');
    const [page3, set3page] = useState('hid');
    const [page4, set4page] = useState('hid');

    const addTask = async (quest, valu) => {
        let res = await axios
            .post("http://localhost:1337/api/responses/", {

                "data": { "Email": email, "surveyQuestion": quest, "surveyResponse": valu }
            })

            .catch((err) => console.log(err));

    };

    useEffect(() => {
        setResponse3(prev => checkbox.box1 + "," + checkbox.box2 + "," + checkbox.box3);
    }, [checkbox])


    const next = () => {
        if (page === 0) {
            set0page(prev => "hid");
            set1page(prev => "view");
            setpage(prev => page + 1);
            setButton(prev => "Next Question");
        }
        if (page === 1) {
            set1page(prev => "hid");
            set2page(prev => "view");
            setpage(prev => page + 1);
            setButton(prev => "Next Question");
        }
        if (page === 2) {
            set2page(prev => "hid");
            set3page(prev => "view");
            setpage(prev => page + 1);
            setButton(prev => "Submit");
        }
        if (page === 3) {
            set3page(prev => "hid");
            set4page(prev => "view");
            setpage(prev => 4);
            setButton(prev => "New Survey");
            addTask(question1.question, response1);
            addTask(question2.question, response2);
            addTask(question3.question, response3);
            getsurvey(lang);
        }
        if (page === 4) {
            set4page(prev => "hid");
            set2page(prev => "view");
            setpage(prev => 2);
            setButton(prev => "Next Question");
        }
    }
    return (
        <div className="App" >
            <div className="main">
                <div className="bar1">
                    <center>
                        <span>Progress</span>
                        <div className="bar2">
                            <div className="bar3" >
                                {page}/3
                            </div>
                        </div>
                    </center>
                </div>
                <div id="surv" className={page0}>

                    <br />
                    <h2>welcome to my survey app</h2>
                    <div className="container">
                        <div className="divid1">
                            <br />
                            <input type="text" className="input" name="" placeholder="Email address" onChange={(event) => setemail(event.target.value)} />
                            <br /><br />
                            <label>Select Language</label>
                            <select className="input" onChange={(event) => load(event.target.value)} placeholder="Select Language">
                                <option>Select Language</option>
                                <option value="en">English </option>
                                <option value="fr-CA">French</option>
                            </select>
                            <br />
                            <br />
                        </div>
                        <div className="divid2">
                            <br />
                            <input type="text" className="input" name="" placeholder="Gender" onChange={(event) => setgender(event.target.value)} />
                            <br /><br />
                        </div>
                    </div>
                </div>
                <div id="surv" className={page1}>
                    <br />
                    <h2>{question1.question}</h2>
                    <div className="container">
                        <div className="divid1">
                            <br />
                            <input type="text" className="input" name="" placeholder="Fullname" onChange={(event) => setResponse1(event.target.value)} />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                <div id="surv" className={page2} hidden>
                    <br />
                    <h2>{question2.question}</h2>
                    <div className="radio_option">
                        <input type="radio" value="22" onClick={(event) => setResponse2(question2.a)} name="r" className="radio" />
                        <label className="font1">{question2.a}</label>
                        <br /><br />
                        <input type="radio" value="22" name="r" className="radio" onClick={(event) => setResponse2(question2.b)} />
                        <label className="font1">{question2.b}</label>
                        <br /> <br />
                        <input type="radio" value="ww" name="r" className="radio" onClick={(event) => setResponse2(question2.c)} />
                        <label className="font1 magin1">{question2.c}</label>
                        <br /><br />
                    </div>
                </div>
                <div id="surv" className={page3} hidden>
                    <br />
                    <h2>{question3.question}</h2>
                    <div className="radio_option">
                        <input type="checkbox" name="e" className="checkbox" onClick={(event) => updateBox('1', question3.a)} />
                        <label className="font1">{question3.a}</label>
                        <br />
                        <br />
                        <input type="checkbox" onClick={(event) => updateBox('2', question3.b)} value="22" name="e" className="checkbox" />
                        <label className="font1">{question3.b}</label>
                        <br />
                        <br />
                        <input type="checkbox" onClick={(event) => updateBox('3', question3.c)} value="." name="r" className="checkbox" />
                        <label className="font1">{question3.c}</label>
                        <br />
                        <br />
                    </div>
                </div>
                <div id="surv" className={page4}>
                    <br />
                    <h2>Survey completed</h2>
                    <div className="container">
                        <b> start another survey now</b>
                    </div>
                </div>
                <button className="btn" onClick={() => next()} > {button} </button>
            </div>
        </div>
    );

}
export default App;