import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import type { Verdict, ReviewResult } from "@/utils/promptRules";

interface ResultCardProps {
  result: ReviewResult;
  originalPrompt: string;
  onTryAgain?: () => void;
}

const ResultCard = ({ result, originalPrompt, onTryAgain }: ResultCardProps) => {
  const getVerdictConfig = (verdict: Verdict) => {
    switch (verdict) {
      case 'ALLOW':
        return {
          icon: CheckCircle,
          color: 'bg-success text-success-foreground',
          bgColor: 'bg-success/10',
          textColor: 'text-success'
        };
      case 'NEEDS_FIX':
        return {
          icon: AlertTriangle,
          color: 'bg-warning text-warning-foreground',
          bgColor: 'bg-warning/10',
          textColor: 'text-warning'
        };
      case 'BLOCK':
        return {
          icon: XCircle,
          color: 'bg-destructive text-destructive-foreground',
          bgColor: 'bg-destructive/10',
          textColor: 'text-destructive'
        };
    }
  };

  const config = getVerdictConfig(result.verdict);
  const Icon = config.icon;

  return (
    <Card className={`w-full max-w-2xl ${config.bgColor} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${config.textColor}`} />
          Review Result
          <Badge className={config.color}>
            {result.verdict}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-1">
            Original Prompt:
          </h4>
          <p className="text-sm bg-muted p-3 rounded-md font-mono">
            {originalPrompt}
          </p>
        </div>

        {result.sanitizedPrompt !== originalPrompt && (
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
              Sanitized Version:
            </h4>
            <p className="text-sm bg-muted p-3 rounded-md font-mono">
              {result.sanitizedPrompt}
            </p>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-sm text-muted-foreground mb-2">
            Analysis & Real-World Impact:
          </h4>
          <ul className="space-y-2">
            {result.reasons.map((reason, index) => {
              let realWorldContext = reason;
              
              if (result.verdict === 'BLOCK') {
                realWorldContext = "This prompt contains unsafe keywords. Allowing this could result in harmful AI output in real scenarios, posing risks to users and organizations.";
              } else if (result.verdict === 'NEEDS_FIX') {
                realWorldContext = "This prompt is too short and unclear. In real use, unclear prompts waste AI resources, increase processing costs, and produce poor results.";
              } else if (result.verdict === 'ALLOW') {
                realWorldContext = "This prompt meets safety and quality standards. It's ready for productive AI interaction in educational or professional environments.";
              }
              
              return (
                <li key={index} className="flex items-start gap-2 text-sm bg-muted/50 p-3 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
                  <span>{realWorldContext}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {result.verdict === 'ALLOW' && result.aiResponse && (
          <div>
            <h4 className="font-semibold text-sm text-muted-foreground mb-2">
              AI Response:
            </h4>
            <div className="bg-success/10 border border-success/20 p-4 rounded-md">
              <p className="text-sm whitespace-pre-wrap">{result.aiResponse}</p>
            </div>
          </div>
        )}

        {result.verdict === 'NEEDS_FIX' && onTryAgain && (
          <div className="pt-2">
            <Button onClick={onTryAgain} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultCard;