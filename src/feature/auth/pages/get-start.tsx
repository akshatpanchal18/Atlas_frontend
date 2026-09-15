import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuMail } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FormInput from "@/components/custom/form-input";
import { getStartSchema, type GetStartFormValues } from "../schema";
import { EmailLoginIcon, GithubLoginIcon, GoogleLoginIcon } from "@/components/icon/icons";
import { Spinner } from "@/components/custom/spinner";
import { useSendOtpMutation } from "@/store/api/auth-api";
import { BASE_URL } from "@/constant/api";
import AuthContent from "../components/auth-content";
import { useNavigate } from "react-router-dom";
import type { SendOtpError } from "@/store/types/auth-types";
import logger from "@/config/logger";

const isGoogleLoginEnable = import.meta.env.VITE_GOOGLE_LOGIN_ENABLE === "true";
const isGithubLoginEnable = import.meta.env.VITE_GITHUB_LOGIN_ENABLE === "true";
const isEmailLoginEnable = import.meta.env.VITE_EMAIL_LOGIN_ENABLE === "true";

const isAnyLoginMethodEnabled = isGoogleLoginEnable || isGithubLoginEnable || isEmailLoginEnable;
export default function GetStart() {
  logger.info("GOOGLE :", isGoogleLoginEnable, "GITHUB :", isGithubLoginEnable, "EMAIL :", isEmailLoginEnable);
  logger.info("ANY :", isAnyLoginMethodEnabled);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<GetStartFormValues>({
    resolver: zodResolver(getStartSchema),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });
  const [loginWithEmail, { isLoading }] = useSendOtpMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: GetStartFormValues) => {
    try {
      logger.info("Login data:", data);

      const res = await loginWithEmail({ email: data.email }).unwrap();
      if (res.success) {
        sessionStorage.setItem("email", data.email);
        navigate("/auth/verify");
      }
    } catch (error) {
      const apiError = error as {
        data?: SendOtpError;
      };

      const errorResponse = apiError.data;

      if (!errorResponse) {
        setError("root.server", {
          type: "server",
          message: "Something went wrong. Please try again.",
        });

        return;
      }

      // Apply backend errors to their corresponding form fields
      errorResponse.errors?.forEach((fieldError) => {
        setError(fieldError.field as keyof GetStartFormValues, {
          type: fieldError.code ?? "server",
          message: fieldError.message,
        });
      });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${BASE_URL}/auth/github`;
  };

  return (
    <AuthContent h1="Get started" p="Choose how you'd like to continue.">
      {!isAnyLoginMethodEnabled ? (
        <div className="mt-8 rounded-lg border bg-muted/30 p-6 text-center">
          {" "}
          <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-full bg-muted">
            {" "}
            <LuMail className="size-5 text-muted-foreground" />{" "}
          </div>{" "}
          <h2 className="text-sm font-semibold"> Sign in is temporarily unavailable </h2>{" "}
          <p className="mt-2 text-sm text-muted-foreground"> We’re currently updating our authentication services. Please try again later. </p>{" "}
        </div>
      ) : (
        <>
          {/* Social login */}
          <div className="mt-8 space-y-3">
            {/* google login */}
            {isGoogleLoginEnable ? (
              <Button type="button" variant="outline" className="group h-12 w-full justify-center gap-3 transition-all hover:border-border hover:bg-accent hover:shadow-sm" onClick={handleGoogleLogin}>
                <GoogleLoginIcon size={30} />
                <span>Continue with Google</span>
              </Button>
            ) : (
              <Button disabled type="button" variant="outline" className="group h-12 w-full justify-center gap-3 transition-all hover:border-border hover:bg-accent hover:shadow-sm">
                <GoogleLoginIcon size={30} />
                <span>Temporary unavailable</span>
              </Button>
            )}

            {/* Github login */}
            {isGithubLoginEnable ? (
              <Button type="button" variant="outline" className="group h-12 w-full justify-center gap-3 transition-all hover:border-border hover:bg-accent hover:shadow-sm" onClick={handleGithubLogin}>
                <GithubLoginIcon size={30} />
                <span>Continue with GitHub</span>
              </Button>
            ) : (
              <Button disabled type="button" variant="outline" className="group h-12 w-full justify-center gap-3 transition-all hover:border-border hover:bg-accent hover:shadow-sm">
                <GithubLoginIcon size={30} />
                <span>Temporary unavailable</span>
              </Button>
            )}
          </div>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <Separator className="flex-1" />

            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">or continue with</span>

            <Separator className="flex-1" />
          </div>

          {/* Email form */}
          {isEmailLoginEnable ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <FormInput id="email" required label="Email" type="email" placeholder="you@example.com" autoComplete="email" error={errors.email?.message} {...field} />}
                />
              </div>

              <Button type="submit" className="group h-12 w-full" disabled={isSubmitting || isLoading}>
                {isSubmitting || isLoading ? (
                  <>
                    <Spinner size="sm" color="white" />
                    Please wait...
                  </>
                ) : (
                  <>
                    <EmailLoginIcon className="size-4" />
                    Continue with Email
                  </>
                )}
              </Button>
            </form>
          ) : (
            <Button disabled type="button" variant="outline" className="group h-12 w-full justify-center gap-3 transition-all hover:border-border hover:bg-accent hover:shadow-sm">
              <EmailLoginIcon size={30} />
              <span>Temporary unavailable</span>
            </Button>
          )}
        </>
      )}
    </AuthContent>
  );
}
