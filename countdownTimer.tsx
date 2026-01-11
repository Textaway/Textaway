"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  onExpire?: () => void;
}

export default function CountdownTimer({ targetDate, onExpire }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onExpire) onExpire();
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onExpire]);
return (
    <div className="inline-flex items-center gap-2 bg-[#1a1a1a] px-4 py-2 rounded-lg border border-gray-800">
      <span className="text-gray-400 text-sm">Reminder expires in:</span>
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 && (
          <span className="text-white font-semibold text-sm">
            {timeLeft.days}d
          </span>
        )}
        <span className="text-white font-semibold text-sm">
          {String(timeLeft.hours).padStart(2, '0')}h
        </span>
        <span className="text-gray-400">:</span>
        <span className="text-white font-semibold text-sm">
          {String(timeLeft.minutes).padStart(2, '0')}m
        </span>
