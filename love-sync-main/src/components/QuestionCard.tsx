import { useState } from "react";
import { Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: string) => void;
  partnerName: string;
}

const QuestionCard = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  partnerName,
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer("");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in-up">
      <div className="bg-card rounded-2xl shadow-romantic p-8 border border-rose-light/50">
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i <= currentIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Partner indicator */}
        <div className="inline-flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full mb-4">
          <Heart className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-medium text-secondary-foreground">{partnerName}</span>
        </div>

        {/* Question */}
        <h3 className="font-display text-2xl text-foreground mb-6 leading-relaxed">
          {question.question}
        </h3>

        {/* Options */}
        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`
                flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer
                ${
                  selectedAnswer === option
                    ? "border-primary bg-secondary"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }
              `}
              onClick={() => setSelectedAnswer(option)}
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer font-medium"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Submit button */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="w-full mt-6 h-12 gradient-romantic text-primary-foreground font-semibold text-lg shadow-romantic hover:shadow-glow transition-all"
        >
          {currentIndex < totalQuestions - 1 ? (
            <>
              Next Question
              <ChevronRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              Submit Answers
              <Heart className="w-5 h-5 ml-2 fill-current" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
