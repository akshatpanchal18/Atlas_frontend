import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMail } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FormInput from "@/components/custom/form-input";
import { getStartSchema, type GetStartFormValues } from "../schema";
import { GithubLoginIcon, GoogleLoginIcon } from "@/components/icon/icons";
import { Spinner } from "@/components/custom/spinner";
import { useSendOtpMutation } from "@/store/api/auth-api";
import { BASE_URL } from "@/constant/api";
import AuthContent from "../components/auth-content";

export default function GetStart() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GetStartFormValues>({
    resolver: zodResolver(getStartSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });
  const [loginWithEmail, { isLoading }] = useSendOtpMutation();

  const onSubmit = async (data: GetStartFormValues) => {
    try {
      console.log("Login data:", data);

      await loginWithEmail({ email: data.email });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      console.log("Continue with Google");

      // await signInWithGoogle()
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGithubLogin = () => {
    window.location.href = `${BASE_URL}/auth/github`;
  };

  return (
    <AuthContent>
      {/* Social login */}
      <div className="mt-8 space-y-3">
        <Button
          type="button"
          variant="outline"
          className="group h-12 w-full justify-center gap-3 transition-all hover:border-border hover:bg-accent hover:shadow-sm"
          onClick={handleGoogleLogin}
        >
          <GoogleLoginIcon size={30} />

          <span>Continue with Google</span>

          {/* <LuArrowRight className="ml-auto size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" /> */}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="group h-12 w-full justify-center gap-3 transition-all hover:border-border hover:bg-accent hover:shadow-sm"
          onClick={handleGithubLogin}
        >
          <GithubLoginIcon size={30} />

          <span>Continue with GitHub</span>

          {/* <LuArrowRight className="ml-auto size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" /> */}
        </Button>
      </div>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <Separator className="flex-1" />

        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          or continue with
        </span>

        <Separator className="flex-1" />
      </div>

      {/* Email form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormInput
                id="email"
                required
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email?.message}
                {...field}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          className="group h-12 w-full"
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? (
            <>
              {/* <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> */}
              <Spinner size="sm" color="white" />
              Please wait...
            </>
          ) : (
            <>
              <LuMail className="size-4" />
              Continue with Email
              {/* <LuArrowRight className="ml-auto size-4 transition-transform group-hover:translate-x-1" /> */}
            </>
          )}
        </Button>
      </form>
    </AuthContent>
  );
}
