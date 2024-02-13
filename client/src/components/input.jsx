// Input.jsx
const Input = ({ name, label, value, onChange, error, type, placeholder }) => {
    return (
      <div className="flex flex-col md-6">
        <label htmlFor={name} className="mb-1 text-sm text-gray-700">
          {label}
        </label>
        <input
          id={name}
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:border-blue-500"
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
      </div>
    );
  };
  
  export default Input;
  