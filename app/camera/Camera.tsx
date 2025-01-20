'use client'
import React, { useRef } from 'react'
import Webcam from 'react-webcam'

const WebcamCapture = () => {
    const webcamRef = useRef<Webcam>(null)

    const capture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot()
            console.log(imageSrc) // Base64画像データ
        }
    }

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: 'user', // "user"（フロントカメラ）または "environment"（バックカメラ）
                }}
            />
            <button onClick={capture}>Capture Photo</button>
        </div>
    )
}

export default WebcamCapture
