// Select.jsx
const Select = ({ label, onChange }) => {
    return (
      <>
        <label>{label}</label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={onChange}
        >
          <option value="user">User</option>
          <option value="artist">Artist</option>
        </select>
      </>
    );
  };
  
  export default Select;
  