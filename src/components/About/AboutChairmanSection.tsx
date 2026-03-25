import ChairManImage from "@/assets/chairman.jpg";
import { motion } from "framer-motion";

export default function AboutChairmanSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-1"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl -z-10" />
            <div className="flex justify-center">
              <img
                src={ChairManImage}
                alt="Chairman"
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover rounded-full shadow-2xl border-4 border-primary/70 mx-auto hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-2 text-center lg:text-left"
          >
            <p className="uppercase tracking-widest text-xs sm:text-sm text-primary font-medium mb-2 sm:mb-3">
              Leadership Message
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent px-4 sm:px-0">
              Message from the Chairman
            </h2>

            <div className="w-16 h-1 bg-primary mb-5 sm:mb-6 rounded-full mx-auto lg:mx-0" />

            <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-base sm:text-lg px-4 sm:px-6 lg:px-0">
              Assalamu Alaikum, আমি Gazi Sultan Juwel, Chairman, GM IT
              Solution। আমাদের যাত্রা শুরু হয়েছিল একটি স্বপ্ন
              নিয়ে—বাংলাদেশের তরুণদের প্রযুক্তিতে দক্ষ করে তোলা এবং
              ব্যবসাগুলোকে ডিজিটালভাবে শক্তিশালী করা। আজ GM IT
              Solution সেই স্বপ্ন বাস্তবায়নের পথে এগিয়ে যাচ্ছে। আমরা
              বিশ্বাস করি, একটি দেশের উন্নয়নের জন্য প্রযুক্তি শিক্ষা
              অত্যন্ত গুরুত্বপূর্ণ। তাই আমরা শুধু সার্ভিস দিচ্ছি না,
              আমরা তৈরি করছি স্কিলড প্রফেশনাল, যারা দেশের অর্থনীতিতে
              ভূমিকা রাখবে এবং বৈদেশিক রেমিটেন্স আনবে। আমাদের প্রতিটি
              প্রজেক্টে আমরা সততা, স্বচ্ছতা এবং দীর্ঘমেয়াদী ভ্যালুকে
              গুরুত্ব দেই। ভবিষ্যতে আমরা আরও উন্নত সফটওয়্যার সলিউশন,
              আন্তর্জাতিক মানের ট্রেনিং এবং গ্লোবাল পার্টনারশিপের
              মাধ্যমে GM IT Solution-কে নতুন উচ্চতায় নিয়ে যেতে চাই।
              আমরা চাই, GM IT Solution শুধু একটি কোম্পানি না—একটি
              ব্র্যান্ড হয়ে উঠুক, যার উপর সবাই ভরসা করতে পারে।
              আপনাদের সবার দোয়া ও সমর্থন আমাদের পথচলার প্রেরণা।
              ধন্যবাদ।
            </p>

            <div className="rounded-xl overflow-hidden shadow-lg border border-border/50 hover:shadow-2xl transition-shadow duration-500 mx-4 sm:mx-6 lg:mx-0">
              <iframe
                className="w-full h-48 sm:h-56 md:h-64"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Chairman Message"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
