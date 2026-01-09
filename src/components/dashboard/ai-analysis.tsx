'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Lightbulb, ListChecks, Zap } from 'lucide-react';
import { useState } from 'react';
import { analyzeSalesmanCommentsAction } from '@/app/actions';
import type { Feedback } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

type AiAnalysisProps = {
  feedbackData: Feedback[];
};

type AnalysisResult = {
  trends: string;
  opportunities: string;
};

export function AiAnalysis({ feedbackData }: AiAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalysis = async () => {
    setLoading(true);
    setResult(null);
    const comments = feedbackData.map((f) => f.salesmanComment).join('\n\n');
    try {
      const analysisResult = await analyzeSalesmanCommentsAction({ comments });
      setResult(analysisResult);
    } catch (error) {
      console.error('AI analysis failed:', error);
      // You could show a toast notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">AI-Powered Analysis</CardTitle>
        </div>
        <CardDescription>
          Analyze salesman comments to find trends and opportunities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleAnalysis} disabled={loading} className="w-full">
          {loading ? 'Analyzing...' : 'Analyze Comments'}
        </Button>

        {loading && (
          <div className="space-y-4 pt-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-1/3 mt-4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        )}
        
        {result && (
          <div className="space-y-4 pt-4 animate-in fade-in">
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-2">
                <ListChecks className="h-5 w-5 text-accent" />
                Key Trends
              </h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.trends}</p>
            </div>
            <div>
              <h3 className="flex items-center gap-2 font-semibold mb-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Opportunities
              </h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{result.opportunities}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
