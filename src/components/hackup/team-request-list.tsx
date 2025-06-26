
"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Frown, PlusCircle } from 'lucide-react';
import { TeamRequestCard } from '@/components/hackup/team-request-card';
import type { TeamRequest } from '@/lib/hackup-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface TeamRequestListProps {
  initialRequests: TeamRequest[];
  onCreateRequestClick: () => void;
}

export function TeamRequestList({ initialRequests, onCreateRequestClick }: TeamRequestListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState(initialRequests);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const filteredRequests = useMemo(() => {
    if (!searchQuery) return requests;
    const lowercasedQuery = searchQuery.toLowerCase();
    return requests.filter(req => 
      req.projectName.toLowerCase().includes(lowercasedQuery) ||
      req.projectDescription.toLowerCase().includes(lowercasedQuery) ||
      req.roles.some(role => role.toLowerCase().includes(lowercasedQuery)) ||
      req.skills.some(skill => skill.toLowerCase().includes(lowercasedQuery))
    );
  }, [searchQuery, requests]);

  return (
    <div className="pb-16 md:pb-24">
      <div className="flex flex-col md:flex-row w-full items-center gap-4 mb-12">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search for projects, roles, or skills..."
            className="pl-12 h-14 text-base bg-card border-0 rounded-full placeholder:text-muted-foreground/60"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={onCreateRequestClick} className="w-full md:w-auto flex-shrink-0 h-14 px-6 rounded-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create a Team
        </Button>
      </div>
      
      {isMounted && (
        <AnimatePresence>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, i) => (
                <motion.div
                  key={request.id}
                  layout
                  className="w-full h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <TeamRequestCard request={request} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="md:col-span-2 text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Frown className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">No requests found</h3>
                <p className="text-muted-foreground">Try a different search term or check back later!</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
