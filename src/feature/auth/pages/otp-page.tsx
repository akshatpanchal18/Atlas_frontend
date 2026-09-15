import { useSendOtpMutation, useVerifyEmailMutation } from "@/store/api/auth-api";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthContent from "../components/auth-content";
import { Button } from "@/components/ui/button";
import { otpSchema, type OtpFormValues } from "../schema";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/redux";
import { setOnboardingStatus, setToken } from "@/store/reducer/auth";
import logger from "@/config/logger";

export default function OtpStep() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [resendTimer, setResendTimer] = useState(30);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = sessionStorage.getItem("email");

  const [resendOtp, { isLoading: resendOtpLoading }] = useSendOtpMutation();

  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyEmailMutation();

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const otp = watch("otp");

  /*
   * Resend countdown
   */
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  /*
   * Update OTP value inside React Hook Form
   */
  const updateOtp = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const digit = value.slice(-1);

    const currentOtp = otp.padEnd(6, "").split("");

    currentOtp[index] = digit;

    const nextOtp = currentOtp.join("").replace(/\s/g, "");

    setValue("otp", nextOtp, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    // Move to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*
   * Keyboard navigation
   */
  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /*
   * Handle OTP paste
   */
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (!pastedValue) return;

    setValue("otp", pastedValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    const nextIndex = Math.min(pastedValue.length, 5);

    inputRefs.current[nextIndex]?.focus();
  };

  /*
   * Resend OTP
   */
  const handleResend = async () => {
    if (resendTimer > 0 || resendOtpLoading) return;
    if (!email) {
      navigate("/auth/get-start");
    }
    try {
      await resendOtp({
        email,
      }).unwrap();

      // Clear old OTP
      setValue("otp", "", {
        shouldValidate: true,
        shouldDirty: false,
      });

      setResendTimer(30);

      inputRefs.current[0]?.focus();
    } catch (error) {
      logger.error("Failed to resend OTP:", error);
    }
  };

  /*
   * Verify OTP
   */
  const handleVerify = async (data: OtpFormValues) => {
    try {
      const res = await verifyOtp({
        email,
        otp: data.otp,
      }).unwrap();

      logger.info("OTP verified successfully");
      if (res.success) {
        dispatch(setToken(res.data?.accessToken));
        if (res.data?.onboarding === true) {
          dispatch(setOnboardingStatus(res.data.onboarding));
        }
      }
      // Navigate to the next step here.
    } catch (error) {
      logger.error("OTP verification failed:", error);
    }
  };

  return (
    <AuthContent h1="Verify your email" p="We've sent a 6-digit verification code to">
      {/* Email */}
      <div className="text-center">
        <p className="mt-1 text-sm font-semibold text-foreground">{email}</p>
      </div>

      <form onSubmit={handleSubmit(handleVerify)} className="mt-9">
        {/* Register the actual form value */}
        <input type="hidden" {...register("otp")} />

        {/* Label */}
        <label htmlFor="otp-0" className="text-sm font-medium text-foreground">
          Verification code
        </label>

        {/* OTP Inputs */}
        <div className="mt-3 flex justify-between gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={otp[index] ?? ""}
              onChange={(event) => updateOtp(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              aria-label={`OTP digit ${index + 1}`}
              className="
                h-14
                w-12
                rounded-xl
                border
                border-input
                bg-background
                text-center
                text-xl
                font-semibold
                text-foreground
                outline-none
                transition-all
                focus:border-primary
                focus:ring-2
                focus:ring-ring/30
                sm:h-16
                sm:w-14
              "
            />
          ))}
        </div>

        {/* Validation error */}
        {errors.otp && <p className="mt-2 text-center text-sm text-destructive">{errors.otp.message}</p>}

        {/* Resend */}
        <div className="mt-6 text-center text-sm">
          {resendTimer > 0 ? (
            <p className="text-muted-foreground">
              Didn't receive the code? <span className="font-medium text-foreground">Resend in {resendTimer}s</span>
            </p>
          ) : (
            <p className="text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                disabled={resendOtpLoading}
                onClick={handleResend}
                className="
                  font-semibold
                  text-primary
                  underline
                  decoration-primary/30
                  underline-offset-4
                  transition-colors
                  hover:text-primary/80
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {resendOtpLoading ? "Sending..." : "Resend code"}
              </button>
            </p>
          )}
        </div>

        {/* Verify */}
        <Button type="submit" disabled={verifyOtpLoading || otp.length !== 6} className="mt-7 h-12 w-full">
          {verifyOtpLoading ? "Verifying..." : "Verify email"}
        </Button>
      </form>
    </AuthContent>
  );
}
