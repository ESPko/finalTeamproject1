function Input({ id, type = "text", placeholder, className }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
}

export default Input;