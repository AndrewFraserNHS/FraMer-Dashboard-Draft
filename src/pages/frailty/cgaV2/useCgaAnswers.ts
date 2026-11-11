import { usePersistentState } from "../../../hooks/usePersistentState";
import type { Answer, Answers, Prompts } from "./model";
import type { PromptStatus } from "../../../components/ui/ReviewField";

/** The assessment's answers, kept for the session so a reload or "save and finish later" loses nothing. */
export function useCgaAnswers() {
  const [answers, setAnswers] = usePersistentState<Answers>("ncrs.cga2.answers", {}, "session");
  const [prompts, setPrompts] = usePersistentState<Prompts>("ncrs.cga2.prompts", {}, "session");
  const [complete, setComplete] = usePersistentState<boolean>("ncrs.cga2.complete", false, "session");

  return {
    answers,
    prompts,
    complete,
    setAnswer: (id: string, answer: Answer) => {
      setAnswers((current) => ({ ...current, [id]: answer }));
      setComplete(false);
    },
    setPrompt: (id: string, status: PromptStatus) => setPrompts((current) => ({ ...current, [id]: status })),
    finish: () => setComplete(true),
    reset: () => {
      setAnswers({});
      setPrompts({});
      setComplete(false);
    },
  };
}
