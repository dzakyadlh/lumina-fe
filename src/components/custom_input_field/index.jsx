export default function CustomInputField({
  type,
  labelText,
  inputName,
  inputValue,
  placeholder,
  onChange,
  isRequired = true,
}) {
  return (
    <div>
      <label htmlFor="cif" className="block mb-2 font-medium text-white">
        {labelText}
      </label>
      <input
        type={type}
        id="cif"
        name={inputName}
        className="w-full border rounded-full block p-4 bg-black border-gray-600 placeholder-gray-400 text-white"
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        required
      />
    </div>
  );
}
