import { Spinner } from "@/components/custom/spinner";
import { GithubLoginIcon, GoogleLoginIcon } from "@/components/icon/icons";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { useLazyRestoreSessionQuery } from "@/store/api/auth-api";
import { setToken } from "@/store/reducer/auth";
import { LuCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

type AuthProvider = "google" | "github";

interface SuccessPageProps {
  provider: AuthProvider;
  title?: string;
  description?: string;
}

export default function SuccessPage({
  provider,
  title = "You're all set!",
  description = "Your account has been successfully created.",
}: SuccessPageProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [restoreSession, { isLoading }] = useLazyRestoreSessionQuery();
  const isGoogle = provider === "google";

  const providerName = isGoogle ? "Google" : "GitHub";
  const providerColor = isGoogle ? "text-blue-600" : "text-gray-900";
  const handleContinue = async () => {
    const res = await restoreSession().unwrap();
    if (res.success && res.data) {
      dispatch(setToken(res.data.accessToken));
      navigate("/");
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
        <div className="mb-7 flex justify-center lg:hidden">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
            <img
              src="/image.png"
              alt="Atlas"
              className="h-10 w-10 object-contain"
            />
          </div>
        </div>
        {/* Success icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <LuCheck fontSize={25} className="text-green-500" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">{description}</p>

        {/* Provider */}
        <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-gray-50 px-4 py-3">
          {isGoogle ? <GoogleLoginIcon /> : <GithubLoginIcon />}

          <span className="text-sm text-gray-600">
            Signed in with{" "}
            <span className={`font-medium ${providerColor}`}>
              {providerName}
            </span>
          </span>
        </div>

        <Button type="button" onClick={handleContinue} className={"w-full"}>
          {isLoading ? (
            <>
              <Spinner size="sm" color="white" />
              Please wait...
            </>
          ) : (
            <>Continue</>
          )}
        </Button>
      </div>
    </main>
  );
}
