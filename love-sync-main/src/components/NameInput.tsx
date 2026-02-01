import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NameInputProps {
  partnerNumber: 1 | 2;
  onSubmit: (name: string) => void;
}

const NameInput = ({ partnerNumber, onSubmit }: NameInputProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in-up">
      <div className="bg-card rounded-2xl shadow-romantic p-8 border border-rose-light/50 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6">
          <Heart className="w-8 h-8 text-primary fill-primary animate-heartbeat" />
        </div>

        <h2 className="font-display text-2xl text-foreground mb-2">
          Welcome, Partner {partnerNumber}!
        </h2>
        <p className="text-muted-foreground mb-6">
          Enter your name to begin the love compatibility test
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 text-center text-lg border-2 border-border focus:border-primary rounded-xl"
            autoFocus
          />
          <Button
            type="submit"
            disabled={!name.trim()}
            className="w-full h-12 gradient-romantic text-primary-foreground font-semibold shadow-romantic hover:shadow-glow transition-all"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Let's Begin
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;
