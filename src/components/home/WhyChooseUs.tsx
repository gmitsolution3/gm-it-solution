import { motion } from "framer-motion";
import { Award, Clock, Target, Users, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Actually experienced people",
    description: "No junior devs learning on your project. Just senior folks who've built stuff like this before.",
  },
  {
    icon: Clock,
    title: "We show up on time",
    description: "Deadlines matter. We respect yours like we'd want you to respect ours.",
  },
  {
    icon: Target,
    title: "Built for your bottom line",
    description: "Pretty designs don't pay the bills. We build stuff that actually moves the needle.",
  },
  {
    icon: Users,
    title: "We don't ghost you",
    description: "Got a problem at 2 AM? We're here. Well, maybe not at 2 AM, but you get the point.",
  },
  {
    icon: Zap,
    title: "Tech that won't embarrass you",
    description: "No legacy spaghetti. Just clean, modern code that'll age better than your competitors'.",
  },
  {
    icon: Shield,
    title: "Serious about security",
    description: "Because getting hacked sucks. We make sure it doesn't happen to you.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/20">
      {/* Simple background - nothing fancy */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* The header - keeping it real */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm uppercase tracking-widest text-primary font-medium">
            Here's the deal
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Why Choose Us?
          </h2>
          <p className="text-lg text-muted-foreground">
            Look, there are a lot of agencies out there. Here's why people stick with us.
          </p>
        </div>

        {/* The good stuff */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative"
              >
                <div className="relative p-8 bg-background rounded-2xl border border-border hover:border-primary/20 transition-all hover:-translate-y-1 hover:shadow-md">
                  {/* Icon - simple but effective */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content - straight to the point */}
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Tiny detail - makes it feel handmade */}
                  <div className="absolute top-4 right-4 text-4xl text-primary/5 font-bold">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple footer - no pressure */}
        <p className="text-center text-sm text-muted-foreground mt-12">
          Still reading?{' '}
          <button className="text-primary hover:text-primary/80 font-medium underline-offset-2 hover:underline">
            Let's talk
          </button>
        </p>
      </div>
    </section>
  );
};