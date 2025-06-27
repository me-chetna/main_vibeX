import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Handshake, HelpingHand, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import type { CommunityEvent, RequestType } from "@/lib/vconnect-types";

const typeDetails: Record<RequestType, { icon: React.ElementType }> = {
  Partner: { icon: Handshake },
  Volunteer: { icon: HelpingHand },
  Attendee: { icon: Users },
};

export function EventCard({ event }: { event: CommunityEvent }) {
  const { icon: Icon } = typeDetails[event.type];

  return (
    <Card className="flex flex-col h-full bg-card hover:bg-card/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="font-headline text-xl mb-2">{event.title}</CardTitle>
          <Badge variant="secondary" className="bg-accent text-accent-foreground shrink-0">
            <Icon className="w-4 h-4 mr-2" />
            {event.type}
          </Badge>
        </div>
        <p className="text-muted-foreground line-clamp-3 h-[60px]">{event.description}</p>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2 text-accent" />
          <span>{format(event.date, "PPP")}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2 text-accent" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <a href={`mailto:${event.contact}`} className="text-primary hover:underline text-sm font-semibold">
          Contact Organizer
        </a>
      </CardFooter>
    </Card>
  );
}
