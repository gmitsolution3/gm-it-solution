export default function CareerError() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-8">
        <p className="text-destructive font-medium">
          Failed to load job listings
        </p>

        <p className="text-muted-foreground text-sm mt-2">
          Please try again later
        </p>
      </div>
    </div>
  );
}
