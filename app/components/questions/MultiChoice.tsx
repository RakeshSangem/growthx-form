"use client";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import RightTick from "../icons/RightTick";
import QuestionLabel from "./QuestionLabel";
import ErrorComp from "./ErrorComp";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { useProgress } from "@/store/progress";

type Props = {
  questionObj: any;
  questionNumber: number;
  onNext: () => void;
};

type StoredAnswers = { [key: string]: string[] };

const MultiChoice: React.FC<Props> = ({
  questionObj,
  onNext,
  questionNumber,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [error, setError] = useState("");

  const [storedAnswers, setStoredAnswers] = useLocalStorage<StoredAnswers>(
    "answers",
    {},
  );
  const setProgress = useProgress((state) => state.setProgress);

  const multiplechoices = questionObj.multiplechoices || 1;

  useEffect(() => {
    const storedValue = (storedAnswers && storedAnswers[questionObj.id]) || [];
    setSelectedOptions(storedValue);
  }, [questionObj.id, storedAnswers]);

  function handleClick(optionId: string) {
    if (multiplechoices === 1) {
      const selected = selectedOptions.includes(optionId);

      if (selected) {
        setProgress(questionNumber - 1);
      } else {
        setProgress(questionNumber);
      }

      setSelectedOptions(selected ? [] : [optionId]);

      setStoredAnswers((prevAnswers) => ({
        ...(prevAnswers ?? {}),
        [questionObj.id]: selected ? [] : [optionId],
      }));
      setError("");
    } else {
      const updatedOptions = selectedOptions.includes(optionId)
        ? selectedOptions.filter((selected) => selected !== optionId)
        : [...selectedOptions, optionId];
      setSelectedOptions(updatedOptions);

      if (updatedOptions.length === 0) {
        setProgress(questionNumber - 1);
      } else {
        setProgress(questionNumber);
      }

      setStoredAnswers((prevAnswers) => ({
        ...(prevAnswers ?? {}),
        [questionObj.id]: updatedOptions,
      }));
      setError("");
    }
  }

  function generateOptionLabel(index: number) {
    return String.fromCharCode(65 + index);
  }

  function handleNext() {
    if (selectedOptions.length === 0) {
      setError("Please select at least one option");
    } else if (selectedOptions.length < multiplechoices) {
      setError("Please select more choices");
    } else {
      setError("");
      onNext();
    }
  }

  return (
    <div className="flex flex-col max-w-2xl w-full px-10">
      <QuestionLabel
        questionObj={questionObj}
        questionNumber={questionNumber}
      />
      <div className="mt-3 pb-2">
        {multiplechoices > 1 && (
          <span className="text-sm text-white/60">
            {selectedOptions.length === 0 && `Choose ${multiplechoices}`}
            {selectedOptions.length > 0 &&
              selectedOptions.length < multiplechoices &&
              `Choose ${multiplechoices - selectedOptions.length} more`}
            {selectedOptions.length === multiplechoices && `Awesome!`}
          </span>
        )}
      </div>
      <div className="space-y-3 flex flex-col w-max">
        {questionObj?.options.map(
          (option: { id: string; value: string }, index: number) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleClick(option.id)}
              disabled={
                selectedOptions.length >= multiplechoices &&
                !selectedOptions.includes(option.id)
              }
              className={`flex items-center w-full bg-[#1A1A1A] ${selectedOptions.includes(option.id) ? "blink-anime" : ""} py-1.5 border border-white/60 rounded-md cursor-pointer text-xl px-2 transition min-h-10 duration-300 hover:bg-zinc-700 ${
                selectedOptions.length >= multiplechoices &&
                !selectedOptions.includes(option.id)
                  ? "opacity-50 cursor-not-allowed pointer-events-none border-white/20"
                  : ""
              }`}
            >
              <span
                className={`border border-white/60 text-xs sm:text-sm w-6 h-6 font-bold grid rounded-sm place-items-center mr-3 ${
                  selectedOptions.includes(option.id)
                    ? "bg-white text-black"
                    : "bg-black"
                }`}
              >
                {generateOptionLabel(index)}
              </span>
              <span className="text-lg mr-4 sm:text-xl">{option.value}</span>
              <span
                className={`${
                  selectedOptions.includes(option.id) ? "visible" : "invisible"
                }  pl-5 ml-auto mr-1`}
              >
                <svg width="16" height="13">
                  <path
                    d="M14.293.293l1.414 1.414L5 12.414.293 7.707l1.414-1.414L5 9.586z"
                    fill="white"
                  />
                </svg>
              </span>
            </button>
          ),
        )}
      </div>
      <div className="py-4">
        {!error ? (
          <Button
            variant="contained"
            color="primary"
            classes={{
              root: "w-min flex items-center bg-[#0277ff] hover:bg-blue-600 px-4 text-white font-bold text-lg w-full",
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
    </div>
  );
};

export default MultiChoice;
