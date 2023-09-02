import React from 'react';

const Timer = ({ timer }) => {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="timer">
            <p>Time Remaining: {formatTime(timer)}</p>
        </div>
    );
};

export default Timer;
