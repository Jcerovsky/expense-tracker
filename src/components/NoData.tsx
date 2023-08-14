import { useNavigate } from "react-router-dom";

function NoData() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        No Data Available
      </h1>
      <p className="text-gray-500 text-center">
        It looks like you haven't added any expenses or income yet.
        <br />
        Start tracking your financial activities by adding new records.
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        onClick={() => navigate("/form")}
      >
        Add Expense/Income
      </button>
    </div>
  );
}

export default NoData;
