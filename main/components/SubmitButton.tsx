"use client";

import { Button } from "./ui/button";
import { TailSpin } from "react-loader-spinner";

export default function SubmitButton({
  children,
  className,
  variant = "default",
  isLoading = false,
  transitionName,
}: {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  isLoading?: boolean;
  transitionName?: string;
}) {
  const derivedTransitionName = transitionName || children;
  return (
    <Button
      type="submit"
      variant={variant}
      className={className}
      disabled={isLoading}
    >
      <TailSpin
        visible={isLoading}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
      {isLoading ? derivedTransitionName : children}
    </Button>
  );
}
