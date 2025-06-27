import type { CommunityEvent } from "@/lib/vconnect-types";

export const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Community Garden Cleanup',
    description: 'Join us to help tidy up our community garden. Gloves and tools provided. A great way to meet neighbors and enjoy the outdoors.',
    type: 'Volunteer',
    date: new Date('2024-08-15T09:00:00'),
    location: 'Central Park Community Garden',
    contact: 'contact@communitygarden.org'
  },
  {
    id: '2',
    title: 'Tech Startup Mixer',
    description: 'Looking for co-founders, investors, or just want to network with local tech talent? This is the place to be.',
    type: 'Partner',
    date: new Date('2024-08-22T18:00:00'),
    location: 'Innovate Hub, 123 Tech Ave',
    contact: 'events@innovatehub.com'
  },
  {
    id: '3',
    title: 'Annual Summer Festival',
    description: 'A day of fun, food, and music for the whole family. We need attendees to make it a success!',
    type: 'Attendee',
    date: new Date('2024-08-30T11:00:00'),
    location: 'Downtown Square',
    contact: 'info@summerfest.org'
  },
  {
    id: '4',
    title: 'Youth Mentorship Program',
    description: 'Seeking volunteers to mentor local youth. A commitment of 2 hours a week can make a huge difference in a young person\'s life.',
    type: 'Volunteer',
    date: new Date('2024-09-05T16:00:00'),
    location: 'City Youth Center',
    contact: 'mentor@cityyouth.org'
  },
  {
    id: '5',
    title: 'Local Business Showcase',
    description: 'We are seeking local businesses to partner with for our showcase event. A great opportunity to promote your products and services.',
    type: 'Partner',
    date: new Date('2024-09-12T10:00:00'),
    location: 'Main Street Convention Hall',
    contact: 'bizshowcase@mainstreet.com'
  },
   {
    id: '6',
    title: 'Open Mic Night',
    description: 'Share your talent or just come and enjoy the show. A welcoming space for poets, musicians, and comedians.',
    type: 'Attendee',
    date: new Date('2024-08-25T19:00:00'),
    location: 'The Cozy Corner Cafe',
    contact: 'events@cozycorner.com'
  },
];
