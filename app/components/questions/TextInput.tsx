import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import QuestionLabel from "./QuestionLabel";
import RightTick from "../icons/RightTick";
import ErrorComp from "./ErrorComp";
import { useLocalStorage } from "@/utils/useLocalStorage";
import { useProgress } from "@/store/progress";

type Props = {
  questionObj: any;
  onNext: () => void;
  questionNumber: number;
};

type StoredAnswers = { [key: string]: string };

export default function TextInput({
  questionObj,
  onNext,
  questionNumber,
}: Props) {
  const { id } = questionObj;
  const [error, setError] = useState<string>("");

  const setProgress = useProgress((state) => state.setProgress);

  const [storedAnswers, setStoredAnswers] = useLocalStorage<StoredAnswers>(
    "answers",
    {},
  );

  const value = storedAnswers?.[id] ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "") {
      setProgress(questionNumber - 1);
    } else {
      setProgress(questionNumber);
    }

    setStoredAnswers((prevAnswers) => ({
      ...(prevAnswers ?? {}),
      [id]: newValue,
    }));
    setError("");
  };

  const handleNext = () => {
    if (value === "") {
      setError("Please fill this in");
    } else {
      setProgress(questionNumber);
      onNext();
    }
  };

  // Update stored value in local storage when the component mounts
  useEffect(() => {
    setStoredAnswers((prevAnswers) => ({
      ...(prevAnswers ?? {}),
      [id]: value,
    }));
  }, [id, value, setStoredAnswers]);

  return (
    <div className="flex flex-col relative max-w-2xl w-full px-10">
      <QuestionLabel
        questionObj={questionObj}
        questionNumber={questionNumber}
      />
      <input
        type="text"
        className="w-full my-4 py-2 border-b-2 border-gray-400 bg-transparent outline-none focus:border-white transition duration-300 ease-in-out sm:text-3xl text-white placeholder-[#4D4D4D text-xl"
        value={value}
        onChange={handleChange}
        placeholder={"Enter your answer here..."}
      />
      {!error ? (
        <Button
          variant="contained"
          color="primary"
          classes={{
            root: "w-min bg-[#0277ff] hover:bg-blue-600 px-4 my-4 text-white font-bold text-lg",
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
function increaceProgress() {
  throw new Error("Function not implemented.");
}
