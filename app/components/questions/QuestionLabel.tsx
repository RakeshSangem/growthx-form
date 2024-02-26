import RightArrow from "../icons/RightArrow";

type questionObj = {
  id: string;
  question: string;
  description?: string;
  type: string;
  options?: { id: string; name: string }[];
};

export default function QuestionLabel({
  questionObj,
  questionNumber,
}: {
  questionObj: questionObj;
  questionNumber?: number;
}) {
  const { question, description } = questionObj;

  return (
    <div className="flex flex-col relative max-w-2xl w-full">
      {questionNumber && (
        <div className="absolute -left-7 top-1 flex items-center justify-center gap-x-1">
          <span className=" text-white text-sm rounded-b-lg">
            {questionNumber}
          </span>
          <RightArrow />
        </div>
      )}
      <div>
        <h1 className="text-xl sm:text-2xl font-normal text-white text-start">
          {question} *
        </h1>
        {description && (
          <p className="py-1 text-[#B3B3B3] text-base">{description}</p>
        )}
      </div>
    </div>
  );
}
