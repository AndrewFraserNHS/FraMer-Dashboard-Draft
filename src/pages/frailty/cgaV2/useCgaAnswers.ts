import { usePersistentState } from "../../../hooks/usePersistentState";
import type { Answer, Answers } from "./model";

/** The assessment's answers, kept for the session so a reload or "save and finish later" loses nothing. */
export function useCgaAnswers() {
  const [answers, setAnswers] = usePersistentState<Answers>("ncrs.cga2.answers", {}, "session");
  const [complete, setComplete] = usePersistentState<boolean>("ncrs.cga2.complete", false, "session");

  return {
    answers,
    complete,
    setAnswer: (id: string, answer: Answer) => {
      setAnswers((current) => ({ ...current, [id]: answer }));
      setComplete(false);
    },
    finish: () => setComplete(true),
    reset: () => {
      setAnswers({});
      setComplete(false);
    },
  };
}
