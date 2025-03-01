import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex items-center justify-center pt-16 min-h-screen">
      <SignIn 
        appearance={{
          baseTheme: dark,
          elements: {
            footerActionLink: {
              color: "#fff",
            },
            rootBox: {
              width: "100%",
              maxWidth: "clamp(380px, 90vw, 420px)"
            },
            card: {
              marginTop: "2rem"
            }
          },
        }}
      />
    </div>
  );
}