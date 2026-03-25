import CeoImage from "@/assets/ceo.jpg";
import { motion } from "framer-motion";

export default function AboutCeoSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-muted/40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-40 left-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <p className="uppercase tracking-widest text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">
              Strategic Vision
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent px-4 sm:px-0">
              CEO’s Vision & Direction
            </h2>

            <div className="w-16 h-1 bg-primary mb-5 sm:mb-6 rounded-full mx-auto lg:mx-0" />

            <blockquote className="border-l-4 border-primary pl-4 sm:pl-6 italic text-muted-foreground mb-5 sm:mb-6 text-base sm:text-lg mx-4 sm:mx-6 lg:mx-0 text-left">
              “Innovation is not optional — it is our responsibility.”
            </blockquote>

            <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg px-4 sm:px-6 lg:px-0">
              Assalamu Alaikum, আমি MD Ashraful Islam, CEO, GM IT
              Solution। GM IT Solution শুধু একটি আইটি কোম্পানি নয়,
              এটি একটি ভিশন। আমরা বিশ্বাস করি—ডিজিটাল যুগে টিকে থাকতে
              হলে প্রযুক্তি ও দক্ষতার বিকল্প নেই। তাই আমরা সফটওয়্যার
              ডেভেলপমেন্ট থেকে শুরু করে ওয়েব ডিজাইন, অ্যাপ
              ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং, গ্রাফিক্স, এবং প্রফেশনাল
              আইটি ট্রেনিং—সবকিছু এক ছাদের নিচে নিয়ে এসেছি। আমাদের
              লক্ষ্য শুধু সার্ভিস দেওয়া নয়, বরং প্রতিটি ক্লায়েন্ট ও
              শিক্ষার্থীর সাথে দীর্ঘমেয়াদী সম্পর্ক গড়ে তোলা। আমরা
              এমন সফটওয়্যার তৈরি করি যা ব্যবসাকে দ্রুত, নিরাপদ ও
              স্মার্ট করে তোলে। আর আমাদের ট্রেনিং প্রোগ্রামগুলো তৈরি
              করা হয়েছে ইন্ডাস্ট্রির বাস্তব অভিজ্ঞতার ভিত্তিতে, যাতে
              একজন শিক্ষার্থী শুধু শিখে না—আয় করতেও পারে। GM IT
              Solution-এ আমরা ইনোভেশন, কোয়ালিটি এবং কাস্টমার
              স্যাটিসফ্যাকশনকে সর্বোচ্চ গুরুত্ব দেই। আমরা চাই, আমাদের
              কাজের মাধ্যমে দেশ ও আন্তর্জাতিক পর্যায়ে একটি শক্ত
              অবস্থান তৈরি করতে। আপনাদের বিশ্বাস ও সহযোগিতাই আমাদের
              এগিয়ে যাওয়ার শক্তি। ধন্যবাদ।
            </p>

            <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-500 mx-4 sm:mx-6 lg:mx-0">
              <iframe
                className="w-full h-48 sm:h-56 md:h-64"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="CEO Message"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
            <div className="flex justify-center">
              <img
                src={CeoImage}
                alt="CEO"
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-full shadow-2xl border-4 border-primary/70 mx-auto hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
