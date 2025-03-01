import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation"; // Fixed import path

export default async function Home() {
  const user = await currentUser();
  
  // Redirect authenticated users
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex w-screen flex-col h-screen bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden overscroll-none">
      <div className="flex flex-col items-center justify-center flex-grow px-4 space-y-8 text-center">
        {/* Animated Hero Section */}
        <div className="max-w-4xl space-y-6 animate-fade-in-up">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Collaborate in Real-Time
          </h1>
          
          <div className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground">
            <p className="leading-relaxed">
              A powerful collaborative code editor with real-time synchronization,
              live chat, and seamless sharing. Code together from anywhere in the world.
            </p>
          </div>

          {/* CTA Button with animation */}
          <div className="mt-8">
            <a href="/sign-up">
              <Button className="group relative px-8 py-6 text-lg font-semibold transition-all hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 -z-10 rounded-lg bg-primary/10 blur-md transition-all group-hover:bg-primary/20" />
              </Button>
            </a>
          </div>
        </div>

        {/* Floating Code Editor Preview */}
        <div className="mt-16 w-full max-w-3xl mx-auto border rounded-xl shadow-2xl bg-background overflow-hidden">
          <div className="p-4 bg-muted/50 flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="p-6 font-mono text-sm space-y-4">
            <div className="flex">
              <span className="text-muted-foreground">1</span>
              <span className="ml-4 text-blue-400">function</span>
              <span className="ml-2 text-emerald-400">greet()</span>
              <span className="ml-2">{"{"}</span>
            </div>
            <div className="flex">
              <span className="text-muted-foreground">2</span>
              <span className="ml-4 text-foreground/80">  console.log(</span>
              <span className="text-orange-300">"Hello, Collaborator!"</span>
              <span className="text-foreground/80">)</span>
            </div>
            <div className="flex">
              <span className="text-muted-foreground">3</span>
              <span className="ml-4">{"}"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
            }}
          >
            {['{}', '()', '[]', ';<', '=>', '/**/'].map((char, j) => (
              <span 
                key={j}
                className="text-muted-foreground/20 mx-1"
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}