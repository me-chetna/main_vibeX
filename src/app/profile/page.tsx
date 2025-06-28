
'use client';

import { useAuth, User } from '@/components/hackup/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Save, XCircle } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  bio: z.string().max(300, {
    message: "Bio must not be longer than 300 characters.",
  }).optional(),
  skills: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const getInitials = (name: string) => {
  if (!name) return 'U';
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function ProfilePage() {
  const { user, loading, updateUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    values: {
        name: user?.name || '',
        bio: user?.bio || '',
        skills: user?.skills?.join(', ') || '',
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
        form.reset({
            name: user.name,
            bio: user.bio || '',
            skills: user.skills?.join(', ') || '',
        });
    }
  }, [user, loading, router, form]);

  function onSubmit(data: ProfileFormValues) {
    const updatedData: Partial<User> = {
        ...data,
        skills: data.skills ? data.skills.split(',').map(s => s.trim()).filter(s => s) : [],
    };
    updateUser(updatedData);
    setIsEditing(false);
    toast({
        title: "Profile Updated",
        description: "Your profile information has been saved.",
    });
  }

  if (loading || !user) {
    return (
      <div className="container mx-auto py-12 px-4 max-w-2xl">
        <Card>
          <CardHeader className="items-center text-center">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="w-full space-y-2 pt-4">
              <Skeleton className="h-8 w-1/2 mx-auto" />
              <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
            <Skeleton className="h-10 w-32 ml-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader className="items-center text-center p-6">
                    <Avatar className="w-24 h-24 text-3xl mb-4 border-4 border-primary">
                        {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    
                    {isEditing ? (
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="w-full max-w-sm">
                              <FormControl>
                                <Input placeholder="Your Name" {...field} className="text-3xl font-headline text-center h-auto p-0 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    ) : (
                        <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
                    )}
                    
                    <p className="text-muted-foreground">{user.email}</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div>
                        <h4 className="text-lg font-semibold font-headline mb-2 text-primary">Bio</h4>
                        {isEditing ? (
                           <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        ) : (
                            <p className="text-muted-foreground whitespace-pre-wrap">{user.bio || 'No bio provided.'}</p>
                        )}
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold font-headline mb-2 text-primary">Skills</h4>
                        {isEditing ? (
                            <FormField
                            control={form.control}
                            name="skills"
                            render={({ field }) => (
                                <FormItem>
                                <FormControl>
                                    <Input placeholder="e.g. React, Python, Figma" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter your skills separated by commas.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {user.skills && user.skills.length > 0 ? (
                                    user.skills.map((skill) => (
                                    <Badge key={skill} variant="secondary">{skill}</Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No skills listed.</p>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-end gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="ghost" type="button" onClick={() => setIsEditing(false)}>
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button type="submit">
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <Button type="button" onClick={() => setIsEditing(true)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    )}
                </CardFooter>
            </form>
        </Form>
      </Card>
    </div>
  );
}
