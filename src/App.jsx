import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isNumberInclude, setIsNumberInclude] = useState(false);
  const [isCharInclude, setIsCharInclude] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let passString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isNumberInclude) {
      passString = passString + "0123456789";
    }

    if (isCharInclude) {
      passString = passString + "`~!@#$%^&*+_-()*";
    }

    for (let i = 1; i <= length; i++) {
      let randomChar = Math.floor(Math.random() * passString.length + 1);

      pass += passString.charAt(randomChar);
    }
    setPassword(pass);
  }, [length, isNumberInclude, isCharInclude]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberInclude, isCharInclude]);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };
  return (
    // Main div
    <div className="w-full h-screen bg-black">
      {/* main div for the generator */}
      <div className="flex flex-col items-center bg-slate-700 w-fit h-fit p-6 rounded-lg absolute left-1/3 top-10 text-orange-500 mx-auto">
        {/* Headding */}
        <h1 className="text-white text-3xl py-3 my-2 font-bold">
          Password Generator
        </h1>
        {/* div for text field */}
        <div className="flex w-full overflow-hidden rounded-lg mb-4 max-w-md">
          <input
            value={password}
            className="w-full outline-none px-3 py-1"
            type="text"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none p-2 bg-blue-700 font-semibold"
            onClick={copyPassword}
          >
            copy
          </button>
        </div>
        {/* Settings section */}
        <div className="flex gap-4 items-center">
          {/* section for range input */}
          <div className="flex gap-2">
            <input
              type="range"
              name=""
              id="length"
              max={100}
              min={6}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="length">Length {length}</label>
          </div>
          {/* section for number */}
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="number"
              id="number"
              defaultChecked={isNumberInclude}
              onChange={() => {
                setIsNumberInclude((prev) => !prev);
              }}
            />
            <label htmlFor="number">Number</label>
          </div>
          {/* Section for char */}
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="charcters"
              id="charcters"
              defaultChecked={isCharInclude}
              onChange={() => {
                setIsCharInclude((prev) => !prev);
              }}
            />
            <label htmlFor="charcters">Charcters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
