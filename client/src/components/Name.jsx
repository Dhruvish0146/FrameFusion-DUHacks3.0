import React from "react";

const Name = ({ name, size, fontFamily }) => {
  return (
    <div>
      {name.split('').map((letter, index) => (
        <span
          key={index}
          style={{
            color: ['#030637', '#3C0753', '#720455', '#910A67'][index % 4],
            fontFamily: fontFamily || 'Arial, sans-serif',
            fontSize: size,
            marginRight: '2px',
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default Name;