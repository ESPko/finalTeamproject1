function Checkbox({ id }) {
  return (
    <input type="checkbox" id={id} className="w-4 h-4 text-cyan-400 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500" />
  );
}

export default Checkbox;