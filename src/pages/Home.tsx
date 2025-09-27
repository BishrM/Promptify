import { useState } from "react";
import PromptInput from "@/components/PromptInput";
import ResultCard from "@/components/ResultCard";
import { reviewPrompt, saveReview, type ReviewResult } from "@/utils/promptRules";
import { generateResponse } from "@/utils/openai";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    
    try {
      const reviewResult = reviewPrompt(prompt);
      
      // If prompt is allowed, get AI response
      if (reviewResult.verdict === 'ALLOW') {
        const aiResponse = await generateResponse(reviewResult.sanitizedPrompt);
        reviewResult.aiResponse = aiResponse;
      }
      
      saveReview(prompt, reviewResult);
      setResult(reviewResult);
      setOriginalPrompt(prompt);
      
      toast({
        title: "Prompt Reviewed",
        description: `Result: ${reviewResult.verdict}${reviewResult.verdict === 'ALLOW' ? ' - AI response generated' : ''}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to review prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    setResult(null);
    setOriginalPrompt("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl font-bold">Promptify</h1>
          <p className="text-lg text-muted-foreground">
            Submit your prompts for automated safety and quality review. 
            Our engine checks for length, content safety, and provides instant feedback with AI responses.
          </p>
        </div>

        <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />

        {result && (
          <ResultCard
            result={result}
            originalPrompt={originalPrompt}
            onTryAgain={handleTryAgain}
          />
        )}
      </div>
    </div>
  );
};

export default Home;