import React from "react";

interface Props {
  errorMessage: string | undefined;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function ErrorMessage({ errorMessage, setErrorMessage }: Props) {
  return (
    <div>
      {errorMessage && (
        <div className="flex justify-center">
          <div className=" mt-10 bg-red-600 p-6 rounded-md relative inline-block text-center">
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
