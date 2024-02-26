"use client";

import { useState } from "react";
import { animated, useTransition } from "@react-spring/web";

import questions from "../questions.json";
import { useGesture } from "@use-gesture/react";
import { QuestionComponents } from "./questions";

export default function FormRoot() {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(1);
  const [wheelDirection, setWheelDirection] = useState("down");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const activeQuestions = [activeQuestionIndex];

  const transitions = useTransition(activeQuestions, {
    ...(wheelDirection === "down"
      ? {
          from: { transform: "translateY(100%)", opacity: 0 },
          enter: { transform: "translateY(0%)", opacity: 1 },
          leave: { transform: "translateY(-100%)", opacity: 0 },
        }
      : {
          from: { transform: "translateY(-100%)", opacity: 0 },
          enter: { transform: "translateY(0%)", opacity: 1 },
          leave: { transform: "translateY(100%)", opacity: 0 },
        }),
  });

  function handleWheelEnd({ direction }: { direction: [number, number] }) {
    setIsPopupOpen(false);
    if (direction[1] > 0) {
      setWheelDirection("down");
      setActiveQuestionIndex((index) => Math.min(index + 1, questions.length));
    } else if (direction[1] < 0) {
      setWheelDirection("up");
      setActiveQuestionIndex((index) => Math.max(index - 1, 1));
    }
  }

  function handleDragEnd({ movement }: { movement: [number, number] }) {
    if (movement[1] > 10) {
      setWheelDirection("up");
      setActiveQuestionIndex((index) => (index === 1 ? index : index - 1));
    } else if (movement[1] < -10) {
      setWheelDirection("down");
      setActiveQuestionIndex((index) =>
        index === questions.length ? index : index + 1,
      );
    }
  }

  const bind = useGesture(
    { onWheelEnd: handleWheelEnd, onDragEnd: handleDragEnd },
    {
      wheel: { enabled: !isPopupOpen },
      drag: { enabled: !isPopupOpen },
    },
  );

  return (
    <section>
      {transitions((style, index) => {
        const questionObj = questions[index - 1];
        const ComponentToRender = QuestionComponents[questionObj.type];
        return (
          <animated.div
            key={index}
            {...bind()}
            className="absolute inset-0 h-screen w-screen flex items-center justify-center"
            style={{
              ...style,
              zIndex: index === 0 ? 1 : 0,
              touchAction: "pan-y",
            }}
          >
            {/* This component will render or pass the appropriate component based on Question Type... */}
            <ComponentToRender
              questionObj={questionObj}
              setIsPopupOpen={setIsPopupOpen}
              questionNumber={index - 1 ?? 0}
              lastquestion={index === questions.length}
              onNext={() => {
                setWheelDirection("down");
                setActiveQuestionIndex((index) =>
                  index === questions.length ? index : index + 1,
                );
              }}
            />
          </animated.div>
        );
      })}
    </section>
  );
}
