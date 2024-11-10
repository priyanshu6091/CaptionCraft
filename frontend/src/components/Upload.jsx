import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";  // Import react-webcam
import "../index.css";
import Topbar from "../Topbar";
import back2 from "../background/back2.jpg";
import Result from "./Result";
import Loader from "./Loader";

const ImageCaptionGenerator = () => {
    const [selectedFile, setSelectedFile] = useState("");   // Selected image file
    const [preview, setPreview] = useState("");             // Image preview
    const [bool, setBool] = useState(false);                // Toggle between main screen and result screen
    const [name, setName] = useState("");                   // User name fetched from API
    const [useWebcam, setUseWebcam] = useState(false);      // Control whether the webcam is enabled
    const webcamRef = useRef(null);                         // Ref for webcam component

    // Handle file input change for uploading image
    const handleImageChange = (event) => {
        const img = event.target.files[0];
        setSelectedFile(img);
        setPreview(URL.createObjectURL(img));
    };

    // Handle the generation of the caption
    const handleGenerateCaption = () => {
        if (selectedFile)
            setBool(true);
        else {
            window.alert("Select image first");
        }
    };

    // Handle fetching user details
    const fetchUser = async () => {
        const url = `http://localhost:8000/fetchnotes`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem('token')
                }
            });
            const text = await response.text();
            if (text) {
                const json = JSON.parse(text);
                setName(json.firstname);
            } else {
                console.error("Empty response from server.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchUser();
        }
    }, []);

    // Capture image from webcam and close the webcam
    const captureFromWebcam = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const imageFile = dataURLtoFile(imageSrc, "captured_image.jpg");
        setSelectedFile(imageFile);
        setPreview(imageSrc);
        setUseWebcam(false);  // Close the webcam
    };

    // Helper function to convert base64 data URL to a file object
    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    return (
        <>
            <div>
                <Topbar />
                {!bool && (
                    <div className="divtop" style={{ }}>
                        <div className="div1">
                            <div className="rightbar">
                                {localStorage.getItem('token') ?
                                    <h1 className="heading">Hello {name}</h1> :
                                    <h1 className="heading">Welcome to CaptionCraft</h1>
                                }

                                <h5 style={{ color: 'black', fontSize: "16px" }}>
                                    Let Images Speak <br />Upload an Image to Generate Captivating Captions!
                                </h5>

                                {/* Option to choose between file upload and webcam */}
                                <div className="image-options">
    <button className="btnGenerate"
        onClick={() => setUseWebcam(true)}
        style={{ marginRight: '10px' }}>
        Use Webcam
    </button>

    {/* Mobile camera input */}
    <input
        type="file"
        accept="image/*"
        capture="environment"  // Change to 'user' if you want front camera
        style={{ color: "black" }}
        onChange={handleImageChange}  // Reuse your existing handler
    />
</div>


                                {/* Webcam Preview */}
                                {useWebcam && (
                                <div className="webcam-container">
                                    <div className="webcam-frame">
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            width={320}
                                            height={240}
                                            className="webcam-feed"
                                        />
                                        {/* Capture icon positioned inside the webcam frame */}
                                        <img
                                            src={require('./pngegg.png')}  // Use relative path to your image
                                            alt="Capture"
                                            className="capture-icon"
                                            onClick={captureFromWebcam}
                                        />
                                    </div>
                                </div>
                                )}



                                {/* Image Preview */}
                                <div className="imgdiv">
                                    {preview && <img className="imgcss" src={preview} alt="image" />}
                                </div>

                                {/* Generate Caption Button */}
                                <div>
                                    <button className="btnGenerate" onClick={handleGenerateCaption}>
                                        Generate Caption
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Result Component */}
                {bool && <Result img={selectedFile} />}
            </div>
        </>
    );
};

export default ImageCaptionGenerator;