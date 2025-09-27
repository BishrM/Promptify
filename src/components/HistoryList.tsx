import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Clock } from "lucide-react";
import type { PromptReview, Verdict } from "@/utils/promptRules";

interface HistoryListProps {
  reviews: PromptReview[];
}

const HistoryList = ({ reviews }: HistoryListProps) => {
  const getVerdictConfig = (verdict: Verdict) => {
    switch (verdict) {
      case 'ALLOW':
        return {
          icon: CheckCircle,
          color: 'bg-success text-success-foreground',
          textColor: 'text-success'
        };
      case 'NEEDS_FIX':
        return {
          icon: AlertTriangle,
          color: 'bg-warning text-warning-foreground',
          textColor: 'text-warning'
        };
      case 'BLOCK':
        return {
          icon: XCircle,
          color: 'bg-destructive text-destructive-foreground',
          textColor: 'text-destructive'
        };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (reviews.length === 0) {
    return (
      <Card className="w-full max-w-4xl">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No Reviews Yet
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            Submit your first prompt to start building your review history.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-3">
      <h2 className="text-2xl font-bold mb-6">Review History</h2>
      {reviews.map((review) => {
        const config = getVerdictConfig(review.verdict);
        const Icon = config.icon;

        return (
          <Card key={review.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${config.textColor} flex-shrink-0`} />
                    <Badge className={`${config.color} text-xs`}>
                      {review.verdict}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium mb-2 line-clamp-2">
                    {review.prompt}
                  </p>
                  
                  {review.sanitizedPrompt !== review.prompt && (
                    <p className="text-xs text-muted-foreground mb-2 font-mono bg-muted p-2 rounded">
                      Sanitized: {review.sanitizedPrompt}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-1">
                    {review.reasons.map((reason, index) => (
                      <span
                        key={index}
                        className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default HistoryList;