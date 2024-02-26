import { Button } from "@mui/material";
import React from "react";

type Props = {
  questionObj: {
    id: string;
    question: string;
    description?: string;
    type: string;
  };
  onNext: () => void;
  questionNumber?: number;
};

export default function Welcome({
  questionObj,
  onNext,
  questionNumber,
}: Props) {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="flex flex-col relative max-w-2xl w-full px-10">
      <h1 className="text-2xl font-normal text-white text-start">
        {questionObj.question}
      </h1>
      {questionObj.description && (
        <div className="py-1 text-[#B3B3B3] text-xl">
          {questionObj.description
            ?.split("\n")
            .map((line: string, index: number) => (
              <React.Fragment key={index}>
                <p>{line}</p>
                {index <
                  (questionObj.description?.split("\n").length ?? 0) - 1 && (
                  <div className="h-2" />
                )}
              </React.Fragment>
            ))}
        </div>
      )}
      <Button
        variant="contained"
        color="primary"
        classes={{
          root: "w-max bg-[#0277ff] hover:bg-blue-600 px-4 my-4 text-white text-lg lowercase",
        }}
        onClick={handleNext}
      >
        <span className="uppercase mr-1.5">I</span> agree
      </Button>
    </div>
  );
}
