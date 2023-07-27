import { fetchData } from "../utils/firebase";
const expensesData = await fetchData();
import { auth } from "../utils/firebase";

function Home() {
  const userName = auth.currentUser?.displayName?.split(" ")[0];

  return (
    <div className="p-3 bg-blue-300 w-full">
      <div className=" ">
        <p>Welcome back {userName}, </p>
        <div className="flex flex-col gap-2">
          {expensesData?.map((item) => (
            <div className="flex gap-2 border-2 rounded-l items-center justify-left p-1">
              <h1>{item.item}</h1>
              <p>{item.cost}</p>
              <p>{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
