"use client";

import { Button } from "@mui/material";
import { useState, useEffect, isValidElement } from "react";
import RightArrow from "../icons/RightArrow";
import { useLocalStorage } from "@/utils/useLocalStorage";
import RightTick from "../icons/RightTick";
import QuestionLabel from "./QuestionLabel";
import ErrorComp from "./ErrorComp";
import { isEmailValid } from "@/utils/utilities";
import { useProgress } from "@/store/progress";

type Props = {
  questionObj: any;
  onNext: () => void;
  questionNumber: number;
  setIsPopupOpen: any;
};

export default function EmailInput({
  questionObj,
  onNext,
  questionNumber,
  setIsPopupOpen,
}: Props) {
  const { id, question, description } = questionObj;
  const setProgress = useProgress((state) => state.setProgress);

  type StoredAnswers = { [key: string]: string };

  const [storedAnswers, setStoredAnswers] = useLocalStorage<StoredAnswers>(
    "answers",
    {},
  );

  const value = storedAnswers?.[id] ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setStoredAnswers((prevAnswers) => ({
      ...(prevAnswers ?? {}),
      [id]: newValue,
    }));
    setError("");
  };

  const [error, setError] = useState<string>("");

  const handleNext = () => {
    if (!isEmailValid(value)) {
      setError("Hmm... that email doesn't look right");
    } else {
      setProgress(questionNumber);
      onNext();
    }
  };

  // check if the error is present if so then stop the scroll
  useEffect(() => {
    // check if the error is present if so then stop the scroll and also check if the value is empty
    if (error) {
      setIsPopupOpen(true);
    }
  }, [error, setIsPopupOpen]);

  return (
    <div className="flex flex-col max-w-2xl w-full px-10">
      <QuestionLabel
        questionObj={questionObj}
        questionNumber={questionNumber}
      />

      <input
        type="email"
        className="w-full my-4 py-2 border-b-2 border-gray-400 bg-transparent outline-none focus:border-white transition duration-300 ease-in-out text-2xl sm:text-3xl text-white placeholder-[#4D4D4D"
        value={value}
        onChange={handleChange}
        placeholder={"name@example.com"}
      />
      {!error ? (
        <Button
          variant="contained"
          color="primary"
          classes={{
            root: "w-max bg-[#0277ff] flex items-center hover:bg-blue-600 px-4 my-4 text-white text-lg",
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
