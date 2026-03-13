const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold text-textPrimary">
        {title}
      </h2>
      {subtitle && (
        <p className="text-textMuted mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;