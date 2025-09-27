import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getReviewHistory, type PromptReview } from "@/utils/promptRules";
import { BarChart3, Users, Shield, Target, Eye, EyeOff } from "lucide-react";

const Dashboard = () => {
  const [reviews, setReviews] = useState<PromptReview[]>([]);
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    const loadHistory = () => {
      const history = getReviewHistory();
      setReviews(history);
    };

    loadHistory();
    
    const handleStorageChange = () => {
      loadHistory();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('reviewAdded', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reviewAdded', handleStorageChange);
    };
  }, []);

  const getStats = () => {
    const total = reviews.length;
    const allowed = reviews.filter(r => r.verdict === 'ALLOW').length;
    const needsFix = reviews.filter(r => r.verdict === 'NEEDS_FIX').length;
    const blocked = reviews.filter(r => r.verdict === 'BLOCK').length;

    return { total, allowed, needsFix, blocked };
  };

  const stats = getStats();

  const pieData = [
    { name: 'ALLOW', value: stats.allowed, color: 'hsl(var(--success))' },
    { name: 'NEEDS_FIX', value: stats.needsFix, color: 'hsl(var(--warning))' },
    { name: 'BLOCK', value: stats.blocked, color: 'hsl(var(--destructive))' }
  ];

  const barData = [
    { name: 'Allowed', count: stats.allowed, fill: 'hsl(var(--success))' },
    { name: 'Needs Fix', count: stats.needsFix, fill: 'hsl(var(--warning))' },
    { name: 'Blocked', count: stats.blocked, fill: 'hsl(var(--destructive))' }
  ];

  const recentActivity = reviews.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center space-y-8">
        <div className="text-center space-y-4 max-w-3xl">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <Button
              variant={adminMode ? "default" : "outline"}
              size="sm"
              onClick={() => setAdminMode(!adminMode)}
              className="flex items-center gap-2"
            >
              {adminMode ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              {adminMode ? "Admin View" : "User View"}
            </Button>
          </div>
          <p className="text-muted-foreground">
            {adminMode 
              ? "Organizational oversight of all AI prompt interactions and safety metrics"
              : "Real-time monitoring of prompt safety and effectiveness metrics"
            }
          </p>
        </div>

        {/* Key Metrics */}
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Total Reviewed</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-success" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Safe Prompts</p>
                    <p className="text-2xl font-bold text-success">{stats.allowed}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Target className="h-8 w-8 text-warning" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Need Improvement</p>
                    <p className="text-2xl font-bold text-warning">{stats.needsFix}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-destructive" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">Blocked</p>
                    <p className="text-2xl font-bold text-destructive">{stats.blocked}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          {stats.total > 0 && (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Recent Activity */}
          {recentActivity.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {adminMode ? "Latest prompt reviews across the organization" : "Your recent prompt submissions"}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-mono bg-muted px-2 py-1 rounded truncate max-w-md">
                          {review.prompt}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {review.createdAt.toLocaleString()}
                        </p>
                      </div>
                      <Badge 
                        className={
                          review.verdict === 'ALLOW' 
                            ? 'bg-success text-success-foreground' 
                            : review.verdict === 'NEEDS_FIX'
                            ? 'bg-warning text-warning-foreground'
                            : 'bg-destructive text-destructive-foreground'
                        }
                      >
                        {review.verdict}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {stats.total === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Data Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start reviewing prompts to see analytics and safety metrics here.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;