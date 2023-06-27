import { useState, useEffect } from 'react';

const Timer = () => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime((prevState) => prevState + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secondsLeft = seconds % 60;

        return `${minutes.toString().padStart(2, '0')}:${secondsLeft
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div>
            <div>{formatTime(elapsedTime)}</div>
        </div>
    );
};

export default Timer;
