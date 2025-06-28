
'use client';

import { useAuth } from '@/components/hackup/providers/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit } from 'lucide-react';

const getInitials = (name: string) => {
  if (!name) return 'U';
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
        <CardHeader className="items-center text-center p-6">
          <Avatar className="w-24 h-24 text-3xl mb-4 border-4 border-primary">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name} />}
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
          <p className="text-muted-foreground">{user.email}</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h4 className="text-lg font-semibold font-headline mb-2 text-primary">Bio</h4>
            <p className="text-muted-foreground">{user.bio || 'No bio provided.'}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold font-headline mb-2 text-primary">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {user.skills && user.skills.length > 0 ? (
                user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No skills listed.</p>
              )}
            </div>
          </div>
        </CardContent>
        <div className="p-6 pt-0 flex justify-end">
            <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
            </Button>
        </div>
      </Card>
    </div>
  );
}
