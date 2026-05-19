export default function CareerLoading() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />

        <p className="mt-4 text-muted-foreground">
          Loading opportunities...
        </p>
      </div>
    </div>
  );
}
