import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import signupSchema from "@/schemas/signupSchema";
import { useNavigate } from "react-router-dom";

interface Signup1Props {
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

const Signup1 = ({
  heading = "Signup",
  // logo = {
  //   url: "https://www.shadcnblocks.com",
  //   src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
  //   alt: "logo",
  //   title: "shadcnblocks.com",
  // },
  buttonText = "Create Account",
  signupText = "Already a user?",
  signupUrl = "/login",
}: Signup1Props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState([""])
  const { signUp } = authClient;
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRole(["admin"])
    console.log("signing up with ", email, password, confirmPassword, fullName, role)

    

    const result = signupSchema.safeParse({ email, password, confirmPassword, fullName, role });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    await signUp.email({
      email,
      password,
      name: fullName,
    },
    {
          onRequest: (ctx) => {
            // Parse the body if it's a string, otherwise use as-is
            const bodyData =
              typeof ctx.body === "string"
                ? JSON.parse(ctx.body)
                : ctx.body;

            // Add custom fields
            const updatedBody = {
              ...bodyData,
              role: ["admin"],
            };

            // Stringify the body back
            ctx.body = JSON.stringify(updatedBody);

            // Return the full context
            return ctx;
          },
        }, 
    //     {
    //   onSuccess: () => {
    //     console.log("Signup successful");
    //     setError(null);
    //     navigate("/");
    //   },
    //   onError: () => {
    //     console.log(email, password, fullName);
    //     setError("Invalid email or password");
    //   }
    // }
  );
    if (error) {
        throw new Error(error || "Registration failed");
      }

      console.log("Registration successful:", result);

      // Better Auth automatically sets session cookies
      // Redirect to home page after successful registration
      navigate("/");

  }

  // const handleGoogleLogin = async () => {
  //   try {
  //     await authClient.signUp.social({
  //       provider: 'google',
  //       callbackURL: "/",
  //     });
  //   } catch (error) {
  //     console.error("Google login failed:", error);
  //     setError("Google login failed. Please try again.");
  //   }
  // }

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
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Input
                id="fullName"
                type="text"
                placeholder="Full Name"
                className="text-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Button type="submit" className="w-full">
                {buttonText}
              </Button>
              {/* <Button variant="outline" type="button" onClick={handleGoogleLogin}>Login with Google</Button> */}
            </form>
          </div>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Signup1 };
