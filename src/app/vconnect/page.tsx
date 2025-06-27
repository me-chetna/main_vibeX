"use client";

import React, { useState, useMemo } from "react";
import { mockEvents } from "@/lib/vconnect-mock-data";
import type { CommunityEvent, RequestType } from "@/lib/vconnect-types";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/vconnect/event-card";
import { RequestForm } from "@/components/vconnect/request-form";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Handshake, Users, HelpingHand, Search, X, Network, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VConnectPage() {
  const [events, setEvents] = useState<CommunityEvent[]>(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedType, setSelectedType] = useState<RequestType | "all">("all");

  const handleAddEvent = (event: CommunityEvent) => {
    setEvents((prevEvents) => [event, ...prevEvents].sort((a, b) => b.date.getTime() - a.date.getTime()));
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDate(undefined);
    setSelectedType("all");
  };

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const searchTermMatch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const typeMatch = selectedType === "all" || event.type === selectedType;
        const dateMatch = !selectedDate || isSameDay(event.date, selectedDate);
        return searchTermMatch && typeMatch && dateMatch;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events, searchTerm, selectedType, selectedDate]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 container mx-auto py-8">
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">Find Your Connection</h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover opportunities for partnership, volunteering, and community engagement. Your next great connection is just a click away.
          </p>
        </section>

        <div className="py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-8">
          <div className="container mx-auto">
            <div className="flex flex-col items-center gap-4">
              <RequestForm onAddEvent={handleAddEvent} />
              <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                <div className="relative w-full md:flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by keyword, role, or location..."
                    className="pl-12 rounded-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as RequestType | "all")}>
                  <SelectTrigger className="w-full md:w-[200px] rounded-full">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Partner"><div className="flex items-center"><Handshake className="mr-2 h-4 w-4"/>Partner</div></SelectItem>
                    <SelectItem value="Volunteer"><div className="flex items-center"><HelpingHand className="mr-2 h-4 w-4"/>Volunteer</div></SelectItem>
                    <SelectItem value="Attendee"><div className="flex items-center"><Users className="mr-2 h-4 w-4"/>Attendee</div></SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full md:w-auto justify-start text-left font-normal rounded-full",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button variant="ghost" onClick={clearFilters} className="w-full md:w-auto rounded-full">
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg">
              <p className="text-xl font-semibold">No requests found</p>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or check back later!</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto py-6 text-center text-muted-foreground px-4 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} ConnectHub. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
