import { useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import options from "../../industries.json"; // Assuming this is where your options are imported from
import { useLocalStorage } from "@/utils/useLocalStorage";
import { Button } from "@mui/material";
import QuestionLabel from "./QuestionLabel";
import ErrorComp from "./ErrorComp";
import RightTick from "../icons/RightTick";
import { useProgress } from "@/store/progress";

type Industry = {
  id: number;
  name: string;
};

type StoredAnswers = { [key: string]: string };

export default function DropdownInput({
  questionObj,
  setIsPopupOpen,
  onNext,
  questionNumber,
}: {
  questionObj: {
    id: string;
    question: string;
    description?: string;
    type: string;
  };
  questionNumber: number;
  onNext: () => void;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [textInput, setTextInput] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<Industry[]>([]);
  const [error, setError] = useState("");

  const { id } = questionObj;

  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [storedAnswers, setStoredAnswers] = useLocalStorage<StoredAnswers>(
    "answers",
    {},
  );

  const setProgress = useProgress((state) => state.setProgress);

  useEffect(() => {
    const storedValue = (storedAnswers && storedAnswers[id]) || "";
    setTextInput(storedValue);
  }, []);

  useEffect(() => {
    if (showDropDown) {
      inputRef.current?.focus();
    }
  }, [showDropDown]);

  useEffect(() => {
    function handleMouseover(event: MouseEvent) {
      if (popupRef.current && popupRef.current.contains(event.target as Node)) {
        setIsPopupOpen(true);
      } else {
        setIsPopupOpen(false);
      }
    }

    document.addEventListener("mouseover", handleMouseover);

    return () => {
      document.removeEventListener("mouseover", handleMouseover);
    };
  }, [setIsPopupOpen]);

  function onFocus() {
    setShowDropDown(true);
  }

  useEffect(() => {
    if (textInput.trim() === "") {
      setFilteredOptions(options);
      setProgress(questionNumber);
    } else {
      const filtered = options.filter((option) =>
        option.name.toLowerCase().includes(textInput.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }
  }, [textInput]);

  const handleOptionClick = (option: { id?: number; name: string }) => {
    setTextInput(option.name);
    setStoredAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: option.name,
    }));
    setShowDropDown(false);
    setProgress(questionNumber + 1);

    setError("");
  };

  const handleNext = () => {
    if (textInput.trim() !== "") {
      setError("");
      onNext();
    } else {
      setError("Please select or type an option.");
    }
  };

  return (
    <div className="flex flex-col relative max-w-2xl w-full px-10">
      <QuestionLabel
        questionObj={questionObj}
        questionNumber={questionNumber}
      />

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={textInput}
          placeholder="Type of Select"
          onChange={(e) => setTextInput(e.target.value)}
          onFocus={onFocus}
          className="w-full my-4 py-2 border-b-2 border-gray-400 bg-transparent outline-none focus:border-white transition duration-300 ease-in-out text-xl sm:text-3xl text-white placeholder-[#4D4D4D"
        />
        <button
          onClick={() => {
            if (showDropDown) {
              setShowDropDown(false);
            } else {
              setShowDropDown(true);
              if (textInput !== "") {
                setTextInput("");
              }
            }
          }}
          className="absolute right-0 top-7 bg-black z-40"
        >
          {textInput === "" ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 9L12 15L18 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
              />
            </svg>
          )}
        </button>
        {showDropDown && (
          <div
            className="absolute z-50 bg-black top-[4.5rem] w-full shadow-lg overflow-y-scroll h-96"
            ref={popupRef}
          >
            <ul className="space-y-1 overflow-y-scroll">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(option);
                  }}
                  className={`flex cursor-pointer ${textInput === option.name ? "blink-anime" : ""} items-center border p-3 rounded-md border-white/0.6 text-white bg-[#1a1a1a] hover:bg-[#2e2e2e]`}
                >
                  {option.name}
                  <svg
                    className={`ml-auto ${
                      textInput === option.name ? "block" : "hidden"
                    }`}
                    width="16"
                    height="13"
                  >
                    <path
                      d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
                      fill="white"
                    />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {!error ? (
        <Button
          variant="contained"
          color="primary"
          classes={{
            root: "w-min bg-[#0277ff] hover:bg-blue-600 px-4 my-4 text-white font-bold text-lg w-full",
          }}
          onClick={handleNext}
        >
          OK
          <RightTick className="ml-2 " />
        </Button>
      ) : (
        <ErrorComp error={error} />
      )}
    </div>
  );
}
