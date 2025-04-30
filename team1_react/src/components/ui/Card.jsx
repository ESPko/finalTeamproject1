function Card({ className, children }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

export default Card;