import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import QuestionLabel from "./QuestionLabel";
import { useLocalStorage } from "@/utils/useLocalStorage";
import RightTick from "../icons/RightTick";
import ErrorComp from "./ErrorComp";
import { useProgress } from "@/store/progress";

type Props = {
  questionObj: any;
  onNext: () => void;
  questionNumber: number;
  lastquestion?: boolean;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
};

type StoredAnswers = { [key: string]: string };

export default function PhoneNumber({
  questionObj,
  onNext,
  questionNumber,
  lastquestion,
  setIsPopupOpen,
}: Props) {
  const { id } = questionObj;
  const [storedAnswers, setStoredAnswers] = useLocalStorage<StoredAnswers>(
    "answers",
    {},
  );

  const setProgress = useProgress((state) => state.setProgress);

  const storedValue = (storedAnswers && storedAnswers[id]) || "";

  const [value, setValue] = useState<string>(storedValue);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setValue(storedValue);
  }, [storedValue]);

  const handleChange = (newValue: string) => {
    setError("");
    if (matchIsValidTel(newValue)) {
      setStoredAnswers((prevAnswers) => ({
        ...(prevAnswers ?? {}),
        [id]: newValue,
      }));
      setProgress(questionNumber);
    } else {
      setProgress(questionNumber - 1);
    }
  };

  const handleNext = () => {
    if (matchIsValidTel(value)) {
      onNext();
    } else {
      setError("Hmm... that phone number doesn't look right");
    }
  };

  return (
    <div className="flex flex-col max-w-2xl w-full px-10">
      <QuestionLabel
        questionObj={questionObj}
        questionNumber={questionNumber}
      />
      <div className="border-b-2 border-gray-400 my-2">
        <MuiTelInput
          className="MuiTelInput"
          defaultCountry={"IN"}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            handleChange(newValue);
            setIsPopupOpen(false);
          }}
          forceCallingCode={true}
          variant="standard"
          InputProps={{
            className: "MuiTelInput-input",
          }}
          onClick={() => {
            setIsPopupOpen(true);
          }}
          MenuProps={{
            className: "MuiTelInputMenu",
            classes: {
              root: "MuiTelInputMenu-root",
            },
            MenuListProps: {
              classes: {
                root: "MuiTelInputMenuList-root",
              },
            },
          }}
        />
      </div>

      {!error ? (
        <Button
          variant="contained"
          color="primary"
          classes={{
            root: "w-min bg-[#0277ff] hover:bg-blue-600 px-4 my-4 text-white font-bold text-lg",
          }}
          onClick={handleNext}
        >
          {lastquestion ? (
            "Submit"
          ) : (
            <>
              OK
              <RightTick className="ml-2" />
            </>
          )}
        </Button>
      ) : (
        <ErrorComp error={error} />
      )}
    </div>
  );
}
