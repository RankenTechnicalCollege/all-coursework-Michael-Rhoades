import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import loginSchema from "@/schemas/loginSchema";

interface Login1Props {
  heading?: string;
  // logo: {
  //   url: string;
  //   src: string;
  //   alt: string;
  //   title?: string;
  // };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login1 = ({
  heading = "Login",
  // logo = {
  //   url: "https://www.shadcnblocks.com",
  //   src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
  //   alt: "logo",
  //   title: "shadcnblocks.com",
  // },
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "https://shadcnblocks.com",
}: Login1Props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = authClient;
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("logging in with ", email, password)

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    await signIn.email({
      email,
      password,
    }, {
      onSuccess: () => {
        console.log("Login successful");
        setError(null);
      },
      onError: () => {
        setError("Invalid email or password");
      }
    });
  }

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Google login failed:", error);
      setError("Google login failed. Please try again.");
    }
  }

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {/* <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert"
            />
          </a> */}
          <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border-red-200 rounded-md">
                  {error}
                </div>
              )}
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="w-full">
                {buttonText}
              </Button>
              <Button variant="outline" type="button" onClick={handleGoogleLogin}>Login with Google</Button>
            </form>
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login1 };
