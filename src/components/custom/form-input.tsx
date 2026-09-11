import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, required, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={id}>
            {label} {required && <span className="text-destructive">*</span>}
          </Label>
        )}

        <Input ref={ref} id={id} {...props} />

        {error && <p className="text-xs text-destructive ml-2">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
