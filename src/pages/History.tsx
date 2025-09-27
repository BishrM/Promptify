import { useEffect, useState } from "react";
import HistoryList from "@/components/HistoryList";
import { getReviewHistory, type PromptReview } from "@/utils/promptRules";
import { Button } from "@/components/ui/button";
import { BarChart3, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const History = () => {
  const [reviews, setReviews] = useState<PromptReview[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const history = getReviewHistory();
      setReviews(history);
    };

    loadHistory();
    
    // Listen for storage changes (when new reviews are added)
    const handleStorageChange = () => {
      loadHistory();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when reviews are added in the same tab
    window.addEventListener('reviewAdded', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reviewAdded', handleStorageChange);
    };
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('promptReviews');
    setReviews([]);
  };

  const getStats = () => {
    const total = reviews.length;
    const allowed = reviews.filter(r => r.verdict === 'ALLOW').length;
    const needsFix = reviews.filter(r => r.verdict === 'NEEDS_FIX').length;
    const blocked = reviews.filter(r => r.verdict === 'BLOCK').length;

    return { total, allowed, needsFix, blocked };
  };

  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-3xl font-bold">Review History</h1>
          <p className="text-muted-foreground">
            Track all your submitted prompts and their review results.
          </p>
        </div>

        {reviews.length > 0 && (
          <div className="w-full max-w-4xl">
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Statistics
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearHistory}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear History
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{stats.allowed}</div>
                    <div className="text-xs text-muted-foreground">Allowed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">{stats.needsFix}</div>
                    <div className="text-xs text-muted-foreground">Needs Fix</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">{stats.blocked}</div>
                    <div className="text-xs text-muted-foreground">Blocked</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <HistoryList reviews={reviews} />
      </div>
    </div>
  );
};

export default History;