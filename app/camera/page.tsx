'use client'
import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'

const WebcamCapture: React.FC = () => {
    const webcamRef = useRef<Webcam>(null)
    const [imageSrc, setImageSrc] = useState<string | null>(null)

    const capture = () => {
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot() // Base64形式の画像データ
            setImageSrc(screenshot) // State に保存
        }
    }

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                    facingMode: 'user', // フロントカメラ
                }}
            />
            <button onClick={capture}>Capture Photo</button>
            {imageSrc && (
                <div>
                    <img
                        src={imageSrc}
                        alt="Captured"
                        style={{ width: '300px', margin: '20px 0' }}
                    />
                    <a
                        href={imageSrc}
                        download="captured_image.jpg" // ダウンロードするファイル名
                    >
                        Download Image
                    </a>
                </div>
            )}
        </div>
    )
}

export default WebcamCapture
