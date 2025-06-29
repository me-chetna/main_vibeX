
"use client";
import Link from 'next/link';
import { useAuth } from '@/components/hackup/providers/auth-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

export function AuthButton() {
    const { user, logout, loading } = useAuth();
    const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
    const { toast } = useToast();

    const handleFeedbackSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
            setFeedbackDialogOpen(false);
        } else {
            toast({
                variant: 'destructive',
                title: "Empty Feedback",
                description: "Please enter your feedback before submitting.",
            });
        }
    };
    
    if (loading) {
        return <Skeleton className="h-10 w-10 rounded-full" />;
    }

    if (user) {
        return (
            <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className="h-10 w-10">
                                {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                         </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.name}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/profile">
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setFeedbackDialogOpen(true)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Feedback</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => logout()}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center font-bold">Thank for your time</DialogTitle>
                        <DialogDescription className="text-center">
                            We appreciate you taking the time to share your thoughts.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFeedbackSubmit} className="space-y-2">
                        <label className="text-sm font-medium text-red-500 font-bold">Feedback</label>
                        <Textarea
                            name="feedback"
                            placeholder="Share your thoughts, suggestions, or issues..."
                            className="min-h-[150px]"
                        />
                        <DialogFooter className="pt-4 justify-center">
                            <Button type="submit">Submit Feedback</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </div>
    );
}
