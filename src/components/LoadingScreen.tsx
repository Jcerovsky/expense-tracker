import { useEffect, useState } from "react";

interface FunFactProps {
  fact: string;
}

function LoadingScreen() {
  const [funFact, setFunFact] = useState<FunFactProps[] | null>(null);
  const API = "https://api.api-ninjas.com/v1/facts";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API, {
          headers: {
            "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY,
            "Content-Type": "application/json",
          },
        });
        const data: FunFactProps[] = await response.json();
        setFunFact(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-blue-300 w-full ml-auto mr-auto border-2 rounded-xl flex flex-col justify-center items-center text-2xl">
      <h1 className="mb-5 justify-self-center">Did you know that??</h1>
      <p>{funFact && funFact[0].fact}</p>
    </div>
  );
}

export default LoadingScreen;
