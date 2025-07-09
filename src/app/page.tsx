'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleGenerateShayari } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Copy, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { AdBanner } from '@/components/AdBanner';

const initialState = {
  shayari: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105">
      {pending ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : null}
      {pending ? 'Generating...' : 'Generate Alfaaz'}
    </Button>
  );
}

function ResultCard({ shayari }: { shayari: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsCopied(false);
  }, [shayari]);

  const handleCopy = () => {
    if (!navigator.clipboard) {
        toast({
            variant: "destructive",
            title: "Browser not supported",
            description: "Clipboard API is not available in your browser.",
        });
        return;
    }
    navigator.clipboard.writeText(shayari).then(() => {
      setIsCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "You can now paste the Shayari anywhere.",
      });
      setTimeout(() => setIsCopied(false), 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy text to clipboard.",
      });
    });
  };

  if (!shayari) return null;

  return (
    <div className="mt-8 w-full animate-fade-in">
        <Card className="bg-black/20 backdrop-blur-sm border-primary/20 w-full relative overflow-visible shadow-lg shadow-primary/10">
          <CardContent className="p-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="absolute -top-4 -right-4 h-10 w-10 bg-card rounded-full text-white/50 hover:text-white hover:bg-primary/80 transition-all duration-300"
              aria-label="Copy Shayari"
            >
              {isCopied ? <Check className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
            </Button>
            <blockquote className="text-center space-y-4">
              {shayari.split('\n').map((line, index) => (
                <p key={index} className="font-headline text-2xl lg:text-3xl text-white leading-relaxed">
                  {line}
                </p>
              ))}
            </blockquote>
          </CardContent>
        </Card>
    </div>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(handleGenerateShayari, initialState);

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
            <form action={formAction} className="space-y-6">
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
              <SubmitButton />
            </form>

            {state.error && (
              <Alert variant="destructive" className="mt-6 bg-red-900/50 border-red-500/50 text-white">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {state.shayari && <ResultCard shayari={state.shayari} />}
      </div>
    </main>
  );
}
