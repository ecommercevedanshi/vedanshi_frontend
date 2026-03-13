const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white
        border border-borderLight
        rounded-xl
        shadow-soft
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;