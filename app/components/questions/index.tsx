import { ComponentType, Dispatch, SetStateAction } from "react";

import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import DropdownInput from "./DropdownInput";
import PhoneNumber from "./PhoneNumber";
import MultiChoice from "./MultiChoice";
import Welcome from "./Welcome";

export type Question = {
  id: string;
  question: string;
  description?: string;
  type: string;
  multiplechoices?: number;
  options?: { id: string; value: string }[];
};

type Props = {
  questionObj: Question;
  onNext: () => void;
  questionNumber: number;
  lastquestion: boolean;
  setIsPopupOpen: Dispatch<SetStateAction<boolean>>;
};

export const QuestionComponents: Record<string, ComponentType<Props>> = {
  welcome: Welcome,
  text: TextInput,
  email: EmailInput,
  phonenumber: PhoneNumber,
  dropdown: DropdownInput,
  select: MultiChoice,
};
