export default function CustomFilledButton({ btnText, onClick }) {
  return (
    <button
      className="px-5 py-2 bg-white rounded-full text-black font-semibold hover:bg-yellow-200 transition duration-300"
      onClick={onClick}
    >
      {btnText}
    </button>
  );
}
