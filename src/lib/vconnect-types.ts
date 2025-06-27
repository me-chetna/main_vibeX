export type RequestType = "Partner" | "Volunteer" | "Attendee";

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  type: RequestType;
  date: Date;
  location: string;
  contact: string;
}
