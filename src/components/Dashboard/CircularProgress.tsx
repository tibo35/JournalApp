import React from "react";

interface CircularProgressProps {
  value: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ value }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width="100" height="100">
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="lightgray"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        stroke="blue"
        strokeWidth="10"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
};

export { CircularProgress };
