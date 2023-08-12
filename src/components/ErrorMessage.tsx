import React, { useEffect } from "react";

interface Props {
  errorMessage: string | undefined;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function ErrorMessage({ errorMessage, setErrorMessage }: Props) {
  useEffect(() => {
    setErrorMessage && setErrorMessage("");
  }, [window.location.pathname]);
  return (
    <div className="m-5">
      {errorMessage && (
        <div className="text-xl">
          <div className="  bg-red-600 p-6 rounded-md relative text-center">
            {errorMessage}
            <button
              className="absolute top-1 right-1 p-1 bg-red-300 rounded-2xl w-5 h-5 flex justify-center items-center text-sm"
              onClick={() => setErrorMessage && setErrorMessage("")}
            >
              <span>X</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
