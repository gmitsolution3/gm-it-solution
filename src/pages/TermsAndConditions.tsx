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

export default function TermsAndConditions() {
  return (
    <div className="pt-32 pb-20 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          {/* Logo */}
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
            Terms & Conditions
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
              1. Introduction
            </h2>
            <p>
              These Terms and Conditions govern your use of the
              website and services provided by{" "}
              <strong>GM IT Solution</strong>. By accessing our
              website or using our services, you agree to comply with
              these terms. If you do not agree, please do not use our
              services.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              2. Services
            </h2>
            <p>
              GM IT Solution provides digital services including web
              development, mobile application development, UI/UX
              design, digital marketing, and business automation
              solutions. All services are delivered digitally unless
              otherwise specified.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              3. Project Agreements
            </h2>
            <p>
              Before starting any project, the scope of work, pricing,
              and timeline will be agreed upon between GM IT Solution
              and the client. Clients are responsible for providing
              required content, information, and approvals necessary
              for project completion.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              4. Payments
            </h2>
            <p>
              Payments must be made according to the agreed quotation
              or invoice. Some services may require advance payment or
              a deposit before work begins. All prices may exclude
              applicable taxes unless otherwise stated.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              5. Refund Policy
            </h2>
            <p>
              Due to the nature of digital services, refunds are
              generally not available once work has started. If a
              project is canceled, payment for completed work may
              still be required.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              6. Revisions
            </h2>
            <p>
              Clients may request revisions depending on the service
              package or project agreement. Additional revisions
              outside the agreed scope may incur extra charges.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              7. Intellectual Property
            </h2>
            <p>
              Upon full payment, clients receive rights to use the
              final deliverables. GM IT Solution may display completed
              work in portfolios, case studies, or promotional
              materials.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              8. Newsletter Subscription
            </h2>
            <p>
              If you subscribe to our newsletter, you agree to receive
              updates, insights, and promotional communications from
              GM IT Solution. You may unsubscribe at any time through
              the link provided in the email.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              9. Limitation of Liability
            </h2>
            <p>
              GM IT Solution is not responsible for indirect or
              consequential damages such as loss of data, business
              interruption, or loss of profits resulting from the use
              of our services or website.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              10. Changes to Terms
            </h2>
            <p>
              We may update these Terms and Conditions from time to
              time. Updated versions will be published on this page
              and continued use of our services indicates acceptance
              of the updated terms.
            </p>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              11. Contact Information
            </h2>
            <p>
              If you have questions regarding these Terms and
              Conditions, please contact us:
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
