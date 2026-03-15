import { motion, Variants } from "framer-motion";
import Logo from "@/assets/logo.png";
import { Link } from "react-router";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function PrivacyAndPolicy() {
  return (
    <div className="pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img
                src={Logo}
                alt="GM IT Solution Logo"
                className="h-12 sm:h-14 md:h-16 w-auto"
              />
            </Link>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Privacy Policy
          </motion.h1>

          <p className="text-muted-foreground">
            Last Updated: March 2026
          </p>
        </div>

        {/* Content */}
        <motion.div
          className="max-w-4xl mx-auto space-y-8 text-muted-foreground leading-relaxed"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Introduction
            </h2>
            <p>
              This Privacy Policy explains how{" "}
              <strong>GM IT Solution</strong>
              (“Company”, “we”, “our”, or “us”) collects, uses, and
              protects your personal information when you use our
              website and services. By accessing our website or using
              our services, you agree to the practices described in
              this policy.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Information We Collect
            </h2>

            <p className="mb-2">
              We may collect personal information when you interact
              with our website or services.
            </p>

            <p className="font-medium text-foreground">
              Information you provide:
            </p>

            <ul className="list-disc ml-6 mt-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Project details submitted through contact forms</li>
              <li>Newsletter subscription information</li>
            </ul>

            <p className="font-medium text-foreground mt-4">
              Information collected automatically:
            </p>

            <ul className="list-disc ml-6 mt-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited on our website</li>
              <li>Time and date of visits</li>
              <li>Device and operating system information</li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              How We Use Your Information
            </h2>

            <p>
              We use the collected information for the following
              purposes:
            </p>

            <ul className="list-disc ml-6 mt-2">
              <li>To provide and maintain our services</li>
              <li>To respond to inquiries and support requests</li>
              <li>To manage client projects and communication</li>
              <li>To send newsletters or updates (if subscribed)</li>
              <li>
                To improve website functionality and user experience
              </li>
              <li>To analyze usage trends and website performance</li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Sharing of Information
            </h2>

            <p>
              We do not sell or rent personal data. However, we may
              share information with trusted third parties when
              necessary to operate our services, such as hosting
              providers, analytics tools, or marketing platforms.
            </p>

            <p className="mt-2">
              We may also disclose information when required by law or
              when necessary to protect our legal rights.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Data Security
            </h2>

            <p>
              We take reasonable measures to protect your personal
              information from unauthorized access, disclosure, or
              misuse. However, no method of internet transmission or
              electronic storage is completely secure.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Third-Party Links
            </h2>

            <p>
              Our website may contain links to third-party websites or
              services. We are not responsible for the privacy
              practices or content of those external websites.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Children's Privacy
            </h2>

            <p>
              Our services are not directed toward individuals under
              the age of 13. We do not knowingly collect personal
              information from children.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Updates to This Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time.
              Changes will be posted on this page with an updated
              revision date.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Contact Information
            </h2>

            <p>
              If you have questions about this Privacy Policy, please
              contact us:
            </p>

            <div className="mt-3">
              <p>
                <strong>GM IT Solution</strong>
              </p>
              <p>Email: gmitsolution.net@gmail.com</p>
              <p>Phone: +880 1898-796506</p>
              <p>Phone: +880 1898-796507</p>
              <p>
                Address: 2nd Floor, House-1, Road-1, Section-7,
                Mirpur-11, Dhaka-1216
              </p>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
