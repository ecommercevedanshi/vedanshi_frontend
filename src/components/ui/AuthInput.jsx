const AuthInput = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-textSecondary">
        {label}
      </label>

      <input
        {...props}
        className="
        border border-borderMedium
        rounded-md
        px-3 py-2
        text-sm
        outline-none
        focus:border-primary
        "
      />
    </div>
  );
};

export default AuthInput;