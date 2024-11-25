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
      <label
        htmlFor="cif"
        className="block mb-2 font-medium text-gray-900 dark:text-white"
      >
        {labelText}
      </label>
      <input
        type={type}
        id="cif"
        name={inputName}
        className="w-full bg-white border border-gray-300 text-gray-900 rounded-full block p-4 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark"
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        required
      />
    </div>
  );
}
