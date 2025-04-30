function CardContent({ className, children }) {
  return (
    <div className={`mt-2 ${className}`}>
      {children}
    </div>
  );
}

export default CardContent;