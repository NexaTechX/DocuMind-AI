export const KeyPoints = ({ document }) => {
  const keyPoints = [
    "Key point 1 from the document.",
    "Key point 2 from the document.",
    "Key point 3 from the document.",
  ];

  return (
    <div className="key-points-container">
      <ul>
        {keyPoints.map((point, index) => (
          <li key={index} className="key-point">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
};
