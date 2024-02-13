// Select.jsx
const Select = ({ label, value, onChange }) => {
  return (
    <div className="mb-6">
      <label htmlFor="default" className="block mb-2 text-sm font-medium text-gray-900 ">
        {label}
      </label>
      <select
        id="default"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={value}
        onChange={onChange}
      >
        <option value="user">User</option>
        <option value="artist">Artist</option>
      </select>
    </div>
  );
};

export default Select;
