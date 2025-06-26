
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { TeamRequest } from '@/lib/hackup-types';
import { format, formatDistanceToNow } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export function TeamRequestCard({ request }: { request: TeamRequest }) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-primary/10 hover:border-primary/40 transition-colors duration-300 rounded-2xl w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">{request.projectName}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <Avatar className="h-6 w-6">
                {request.author.avatarUrl && <AvatarImage src={request.author.avatarUrl} alt={request.author.name} />}
                <AvatarFallback>{getInitials(request.author.name)}</AvatarFallback>
            </Avatar>
            <span>{request.author.name}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4 flex-grow">
        <p className="text-muted-foreground line-clamp-3">{request.projectDescription}</p>
        <div>
            <h4 className="font-semibold text-sm mb-2 text-card-foreground/80">Skills Required</h4>
            <div className="flex flex-wrap gap-2">
                {request.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="font-normal">{skill}</Badge>
                ))}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Posted {formatDistanceToNow(request.createdAt, { addSuffix: true })}</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Hackathon on {format(request.hackathonDate, "PPP")}</span>
            </div>
        </div>
        <Button size="sm" variant="outline-primary" className="w-full sm:w-auto">Join Team</Button>
      </CardFooter>
    </Card>
  );
}
