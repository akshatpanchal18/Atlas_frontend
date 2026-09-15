import { type ReactNode } from "react";
import { LuShieldCheck } from "react-icons/lu";
interface AuthContentProps {
  children: ReactNode;
  h1?: string;
  p?: string;
}
const AuthContent = ({ children, h1, p }: AuthContentProps) => {
  return (
    <div>
      <div className="mb-7 flex justify-center lg:hidden">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
          <img
            src="/image.png"
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
        </div>
      </div>

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          {h1 || "Get started"}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {p || "Choose how you'd like to continue."}
        </p>
      </div>
      {children}

      {/* Terms */}
      <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
        By continuing, you agree to our{" "}
        <a
          href="#"
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary"
        >
          Privacy Policy
        </a>
        .
      </p>

      {/* Security */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <LuShieldCheck className="size-3.5" />
        Your information is protected
      </div>
    </div>
  );
};

export default AuthContent;
