import { Skeleton } from "@/components/ui/skeleton";

export function SocialSkeleton() {
  return (
    <div className="flex w-full gap-2 p-5">
      <div className="w-1/2 flex flex-col gap-3">
        <Skeleton className="h-5 w-full bg-slate-300" />
        <Skeleton className="h-5 w-full bg-slate-300" />
        <Skeleton className="h-5 w-2/3 bg-slate-300" />

        <Skeleton className="h-3 w-full bg-slate-300 mt-8" />
        <Skeleton className="h-3 w-full bg-slate-300" />
        <Skeleton className="h-3 w-full bg-slate-300" />
        <Skeleton className="h-3 w-4/5 bg-slate-300" />
      </div>
      <div className="flex justify-center items-center w-1/2">
        <Skeleton className="h-[500px] w-[325px] rounded-md bg-slate-300" />
      </div>
    </div>
  );
}
