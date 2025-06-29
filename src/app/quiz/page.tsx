
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun } from "lucide-react";

const quizzes = [
  {
    title: "The Impossible Quiz",
    subtitle: "Can you beat it?",
    icon: "🤔",
  },
  {
    title: "General Knowledge",
    subtitle: "Trivia Time",
    icon: "🌍",
  },
  {
    title: "Anime Fandom",
    subtitle: "Test Your Isagi IQ",
    icon: "🍥",
  },
  {
    title: "Tech & Coding",
    subtitle: "Think like a programmer",
    icon: "💻",
  },
  {
    title: "Pop Culture",
    subtitle: "Let's play APT",
    icon: "🎤",
  },
];

const leaderboardData = [
  { rank: 1, name: "Alice", score: 1500, avatarUrl: "https://placehold.co/40x40.png", hint: "abstract person" },
  { rank: 2, name: "Bob", score: 1350, avatarUrl: "https://placehold.co/40x40.png", hint: "robot face" },
  { rank: 3, name: "Charlie", score: 1200, avatarUrl: "https://placehold.co/40x40.png", hint: "cat astronaut" },
  { rank: 4, name: "Diana", score: 1100, avatarUrl: "https://placehold.co/40x40.png", hint: "dog sunglasses" },
  { rank: 5, name: "Eve", score: 950, avatarUrl: "https://placehold.co/40x40.png", hint: "pixel art" },
];

const getInitials = (name: string) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

const topQuiz = quizzes[0];
const otherQuizzes = quizzes.slice(1);

const topThree = leaderboardData.slice(0, 3);
const restOfLeaderboard = leaderboardData.slice(3);

const podiumOrder = [topThree.find(p => p.rank === 2), topThree.find(p => p.rank === 1), topThree.find(p => p.rank === 3)];

export default function QuizPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter bg-quizly-gradient bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow">Quizly</h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto text-accent">
          Play like never before
        </p>
      </div>
      
      <Card className="w-full flex flex-col md:flex-row items-center gap-8 mb-12 p-8 border-2 border-primary/20 hover:border-primary/50 hover:shadow-glow-orange transition-all duration-300">
        <div className="text-6xl md:text-8xl" role="img" aria-label="icon">{topQuiz.icon}</div>
        <div className="flex-grow text-center md:text-left">
            <CardTitle className="font-headline text-4xl">{topQuiz.title}</CardTitle>
            <CardDescription className="text-lg mt-2">{topQuiz.subtitle}</CardDescription>
        </div>
        <Button size="lg" className="w-full md:w-auto mt-4 md:mt-0">Take Quiz</Button>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {otherQuizzes.map((quiz, index) => (
            <Card key={index} className="w-full flex flex-col border-2 border-primary/20 hover:border-primary/50 hover:shadow-glow-orange transition-all duration-300">
              <CardHeader>
                  <div className="flex items-start justify-between">
                      <CardTitle className="font-headline text-2xl">{quiz.title}</CardTitle>
                      <span className="text-4xl" role="img" aria-label="icon">{quiz.icon}</span>
                  </div>
                <CardDescription>{quiz.subtitle}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button className="w-full">Take Quiz</Button>
              </CardFooter>
            </Card>
          ))}
      </div>

      <div>
        <h2 className="text-3xl font-bold text-center mb-8 font-headline text-primary">Leaderboard</h2>
        <Card className="border-2 border-primary/20 p-6 overflow-hidden">
          <div className="flex items-end mb-8 w-full">
            {podiumOrder.map((player) => {
              if (!player) return null;
              const isFirst = player.rank === 1;
              const isSecond = player.rank === 2;
              const podiumClasses = {
                height: isFirst ? 'h-32' : isSecond ? 'h-28' : 'h-24',
                avatarSize: isFirst ? 'w-24 h-24 text-4xl' : 'w-20 h-20 text-3xl',
                color: isSecond ? 'bg-red-500' : isFirst ? 'bg-gradient-to-br from-red-500 to-white' : 'bg-purple-500',
                borderColor: isSecond ? 'border-red-500' : isFirst ? 'border-red-500' : 'border-purple-500',
                textColor: isFirst ? 'text-red-500' : 'text-white'
              };
              return (
                <div key={player.rank} className="flex-1 flex flex-col items-center gap-2 text-center">
                  {isFirst && <Sun className="w-8 h-8 text-red-500 mb-2" />}
                  <Avatar className={`${podiumClasses.avatarSize} border-4 ${podiumClasses.borderColor}`}>
                    <AvatarImage src={player.avatarUrl} alt={player.name} data-ai-hint={player.hint} />
                    <AvatarFallback>{getInitials(player.name)}</AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-lg">{player.name}</p>
                  <p className="text-muted-foreground font-semibold">{player.score} pts</p>
                  <div className={`w-full flex items-center justify-center text-2xl font-bold ${podiumClasses.height} ${podiumClasses.color} ${podiumClasses.textColor}`}>
                    {player.rank}
                  </div>
                </div>
              );
            })}
          </div>
          
          <Table>
            <TableBody>
              {restOfLeaderboard.map((player) => (
                <TableRow key={player.rank} className="hover:bg-pink-100/50">
                  <TableCell className="font-bold text-lg text-center w-16">{player.rank}</TableCell>
                  <TableCell>
                      <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                              <AvatarImage src={player.avatarUrl} alt={player.name} data-ai-hint={player.hint} />
                              <AvatarFallback>{getInitials(player.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-base">{player.name}</span>
                      </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-lg">{player.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

    </div>
  );
}
