import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

interface MsgSuccessProps {
    msg: string;
    duration?: number; // duração da exibição em milissegundos
}

export default function MsgSuccess({ msg, duration = 5000 }: MsgSuccessProps) {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => prev + (100 / (duration / 100)));
        }, 100);

        setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
                setVisible(false);
            }, 500); 
            clearInterval(interval);
        }, duration);

        return () => clearInterval(interval);
    }, [duration]);

    if (!visible) return null;

    return (
        <div
            className={`flex fixed z-30 lg:top-25 right-5 lg:right-30 justify-center items-center p-5 transition-opacity ${
                isFading ? "opacity-0" : "opacity-100"
            }`}
            style={{ transitionDuration: "500ms" }}
        >
            <div className="flex flex-col items-center gap-4 bg-green-500 p-5 rounded-lg shadow-xl">
                <div className="flex items-center gap-4">
                    <FaCheck className="lg:text-3xl text-white" />
                    <h1 className="lg:text-2xl text-white font-bold text-[#374151]">{msg}</h1>
                </div>

                <div className="w-full bg-white/40 rounded-full h-1 mt-2">
                    <div
                        className="bg-white h-full rounded-full"
                        style={{ width: `${progress}%`, transition: "width 0.1s" }}
                    />
                </div>
            </div>
        </div>
    );
}
