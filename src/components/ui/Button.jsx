const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`
        bg-primary 
        hover:bg-primaryHover
        text-white
        px-6 py-2
        rounded-md
        transition
        font-medium
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;