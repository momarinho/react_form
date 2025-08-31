const FormInput = ({ label, name, value, onChange, error, type = "text" }) => (
  <div>
    <label className="block text-gray-700 text-sm font-semibold mb-2">
      {label} {type !== "textarea" && "*"}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 rounded-lg border ${
        error ? "border-red-500" : "border-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
  </div>
);

export default FormInput;
