import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import '../bgvid.mp4';
import { useSpeechSynthesis } from 'react-speech-kit'
import TransButton from './TransButton';
import Upload from './Upload';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
// import "../topbar.css";

const Result = (props) => {

  const [preview, setPreview] = useState();
  const [caption, setCaption] = useState();           // Changing caption on UI
  const [cap, setCap] = useState();                   // Constant caption
  const { speak } = useSpeechSynthesis();
  const [bool1, setBool] = useState(false);

  const handleListen = () => {
    speak({ text: caption })
  }

  const callback = (lang) => {
    if (lang) {
        setCaption(lang);
    } else {
        console.error("Received undefined translation.");
    }
}

const fetchCaption = async () => {
  const formData = new FormData();
  formData.append('file', props.img);

  try {
    const url = `http://localhost:5000/after`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setCaption(data.caption);
    setCap(data.caption);
    console.log(data.caption);

  } catch (err) {
    console.error("Error fetching caption:", err);
  }
}

  useEffect(() => {
    setPreview(URL.createObjectURL(props.img));

    fetchCaption();

  }, [])
  const handleClick = () => {
    setBool(true);
  }

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  }

  return (
    <>
      {!bool1 && <div className="result-page">
      {/* {localStorage.getItem('token') && <button onClick={handleLogout} className='result-logout' style={{ position: 'absolute', right: '118px', top: '27px' }}>Logout</button>} */}
        {/* <video id="bg-video" src="../bgvid.mp4" autoplay loop muted></video> */}
        <div className="result-window" style={{ position: 'reative' }}>
          {/* <button className="back-button" style={{ marginLeft: "-31rem" }} onClick={handleClick} >Go back</button> */}
          <h1 className="result-heading">Result</h1>
          {preview && <img className="result-image" src={preview} alt="image" />}
          {caption ? (
            <p className="result-caption">{caption}</p>
          ) : (
            <Loader />
          )}
          <div className='extra-button'>
            {localStorage.getItem('token') && <button className="text-to-speech-btn" onClick={handleListen}>
              Convert text to speech
            </button>}
            {localStorage.getItem('token') && <TransButton callback={callback} cap={cap} />}
          </div>
          {!localStorage.getItem('token') && <Link to='/login'>Sign in to translate and hear the caption</Link>}
        </div>
      </div>}

      
      {bool1 && <Upload />}
    </>
  );
}

export default Result;