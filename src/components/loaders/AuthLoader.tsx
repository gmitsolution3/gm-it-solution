import { Loader2 } from "lucide-react";

export default function AuthLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      <div className="text-center">
        <p className="text-lg font-medium">
          Checking authentication...
        </p>
        <p className="text-sm text-muted">
          One moment while we validate your session.
        </p>
      </div>
    </div>
  );
}
