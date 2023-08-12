import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-purple-600 to-indigo-800 py-10">
      <div className="container mx-auto flex flex-col justify-center h-screen items-center gap-8 bg-gray-100 rounded-lg shadow-lg">
        <div className="text-center mt-8">
          <h1 className="text-4xl font-semibold mb-7">
            Welcome to Your Finance Manager
          </h1>
          <p className="text-lg">Track your expenses and income with ease.</p>
        </div>
        <div className="flex flex-col items-center gap-4 mt-6">
          <button
            onClick={() => navigate("add-income")}
            className="rounded-full px-6 py-3 text-white bg-gradient-to-b from-purple-600 to-indigo-500 hover:scale-105 transition duration-300 w-44"
          >
            Add Income
          </button>
          <button
            onClick={() => navigate("add-expense")}
            className="rounded-full px-6 py-3 text-white bg-gradient-to-r from-teal-300 to-blue-500 hover:bg-gradient-to-r from-teal-400 hover:scale-105 to-blue-600 transition duration-300 w-44"
          >
            Add Expense
          </button>
        </div>
        <div className="w-64 h-2 bg-gradient-to-r from-teal-300 to-blue-500 rounded-lg"></div>
      </div>
    </div>
  );
}

export default Form;
