export const Spinner = () => {
  return (
    <div className="dot-spinner">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className={`dot-spinner__dot rotate-${index * 45}`}
        ></div>
      ))}
    </div>
  );
};
