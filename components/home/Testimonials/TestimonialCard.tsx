import Image from "next/image";

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: any;
}) {
  return (
    <div className="flex-shrink-0 w-[400px]">
      <div className="p-8 rounded-none bg-card/80 backdrop-blur-xl border border-border">
        <p className="text-lg text-card-foreground/80 leading-relaxed mb-8">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border flex-shrink-0">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          </div>

          <div>
            <h4 className="font-semibold text-card-foreground">
              {testimonial.name}
            </h4>

            <p className="text-sm text-muted-foreground">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
