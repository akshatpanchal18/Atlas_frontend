import { toast } from "@/components/ui/toast";

type ToastOptions = {
  title: string;
  description?: string;
};

function normalize(input: string | ToastOptions): ToastOptions {
  return typeof input === "string" ? { title: input } : input;
}

export const Toast = {
  success(input: string | ToastOptions) {
    toast.add({
      ...normalize(input),
      type: "success",
    });
  },

  error(input: string | ToastOptions) {
    toast.add({
      ...normalize(input),
      type: "error",
    });
  },

  warning(input: string | ToastOptions) {
    toast.add({
      ...normalize(input),
      type: "warning",
    });
  },

  info(input: string | ToastOptions) {
    toast.add({
      ...normalize(input),
      type: "info",
    });
  },

  promise: toast.promise,
};
