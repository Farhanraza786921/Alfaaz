'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from '@/components/AdBanner';

export default function Home() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      variant: "destructive",
      title: "Feature Temporarily Disabled",
      description: "The AI Shayari generation is currently unavailable. We are working on resolving deployment issues.",
    });
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        <AdBanner />
        <Card className="bg-black/30 backdrop-blur-sm border-primary/20 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center p-8">
            <h1 className="font-headline text-5xl lg:text-6xl font-bold text-white tracking-wider">ALFAAZ.AI</h1>
            <CardDescription className="text-white/60 text-lg mt-2 font-body">
              Your personal AI Shayari companion
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white/80 font-semibold text-base font-body">Choose a feeling</Label>
                <Select name="category" defaultValue="Love" required>
                  <SelectTrigger id="category" className="w-full text-base h-12 bg-black/20 border-primary/30 text-white focus:ring-primary focus:ring-offset-0 focus:border-primary font-body">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#101010] border-primary/50 text-white font-body">
                    <SelectItem value="Love">Love</SelectItem>
                    <SelectItem value="Sad">Sad</SelectItem>
                    <SelectItem value="Dard">Dard (Pain)</SelectItem>
                    <SelectItem value="Attitude">Attitude</SelectItem>
                    <SelectItem value="Funny">Funny</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" size="lg" className="w-full text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105">
                Generate Alfaaz
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
