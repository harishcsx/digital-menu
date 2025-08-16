
const AuthForm = ({ title, buttonText, onSubmit, children }) => {
  return (
    <div className="auth-container">
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
        <button type="submit" className="auth-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
