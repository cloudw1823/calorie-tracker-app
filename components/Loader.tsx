import { useEffect, useState } from 'react'
import '../style/spinnerLoader.css'

export default function SinnerLoader() {
    const [progressValue, setProgressValue] = useState(0)
    useEffect(() => {
        let value = 0
        const interval = setInterval(() => {
            value += 1
            setProgressValue(value)
            if (value >= 100) clearInterval(interval)
        }, 1)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative flex justify-center items-center px-3">
            <div>
                <svg className="progress-ring" width="180" height="180">
                    <circle
                        className="progress-ring__background"
                        cx="90"
                        cy="90"
                        r="80"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="15"
                        fill="transparent"
                    />
                    <circle
                        className="progress-ring__circle"
                        cx="90"
                        cy="90"
                        r="80"
                        stroke="rgb(240, 186, 50)"
                        strokeWidth="15"
                        fill="transparent"
                        strokeDasharray="502"
                        strokeDashoffset={502 - (502 * progressValue) / 100}
                    />
                </svg>
            </div>
            <div className="absolute w-[145px] h-[145px] bg-white rounded-full flex flex-col justify-center items-center progress-counter">
                <div className="icon-glow">⚡</div>
                <span className="text-5xl">{progressValue}</span>
                <p className="text-gray-400 text-sm w-1/2 break-words ml-6">
                    カロリー
                </p>
            </div>
        </div>
    )
}
