
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const feedback = formData.get('feedback');
    if (feedback && (feedback as string).trim().length > 0) {
      console.log("Feedback submitted:", feedback);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback.",
      });
      (event.target as HTMLFormElement).reset();
      router.push('/hackup');
    } else {
       toast({
        variant: 'destructive',
        title: "Empty Feedback",
        description: "Please enter your feedback before submitting.",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 flex justify-center">
      <Card className="max-w-2xl w-full shadow-glow-orange border-primary/50">
        <CardHeader className="text-center p-6">
          <CardTitle className="text-4xl font-headline">Thanks for your time</CardTitle>
          <CardDescription>Your feedback is valuable to us.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold font-headline text-primary">Feedback</h3>
              <Textarea
                name="feedback"
                placeholder="Share your thoughts, suggestions, or issues..."
                className="min-h-[150px] border-2 border-transparent focus-visible:ring-primary focus-visible:border-primary focus-visible:shadow-glow-orange transition-shadow duration-300"
                rows={6}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
