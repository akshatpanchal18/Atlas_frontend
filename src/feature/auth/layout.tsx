import { LuShieldCheck, LuSparkles } from "react-icons/lu";
import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthPanelProps {
  children: ReactNode;
  className?: string;
}

const AuthPanel = ({ children, className = "" }: AuthPanelProps) => {
  return (
    <section
      className={`relative min-h-0 overflow-hidden p-6 sm:p-8 lg:p-10 xl:p-12 ${className}`}
    >
      {children}
    </section>
  );
};

const AuthLayout = () => {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

        {/* Bottom-right glow */}
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Page wrapper */}
      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl items-center px-4 py-4 sm:px-6">
        {/* Main card */}
        <div
          className="
            grid
            w-full
            overflow-hidden
            rounded-3xl
            border
            border-border
            bg-background/80
            shadow-2xl
            shadow-black/5
            backdrop-blur-sm

            lg:max-h-[calc(100dvh-2rem)]
            lg:grid-cols-2
          "
        >
          {/* LEFT */}
          <AuthPanel
            className="
              hidden
              bg-muted/30
              lg:flex
              lg:flex-col
              lg:justify-between
            "
          >
            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-border/50" />

            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-border/40" />

            <div className="relative">
              {/* Logo */}
              <div className="mb-10 flex size-16 items-center justify-center rounded-xl border border-border bg-background shadow-sm xl:mb-12 xl:size-20">
                <img
                  src="/image.png"
                  alt="Logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="max-w-md">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium">
                  <LuSparkles className="size-3.5 text-primary" />
                  Welcome aboard
                </div>

                <h2 className="text-3xl font-semibold leading-tight tracking-tight xl:text-5xl">
                  Everything starts
                  <span className="block text-primary">with one step.</span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground xl:mt-6 xl:text-base xl:leading-7">
                  Create your account and get access to your workspace, tools,
                  and everything you need to bring your ideas to life.
                </p>
              </div>
            </div>

            {/* Bottom info */}
            <div className="relative mt-8">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <LuShieldCheck className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    Simple. Secure. Private.
                  </p>

                  <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                    Your information is protected with secure authentication and
                    encrypted data.
                  </p>
                </div>
              </div>
            </div>
          </AuthPanel>

          {/* RIGHT */}
          <AuthPanel
            className="
              flex
              items-center
              justify-center
            "
          >
            <div className="w-full max-w-sm">
              {/* Mobile logo */}

              {/* Child auth route */}
              <Outlet />
            </div>
          </AuthPanel>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
