import { getServices } from "@/services/getServices";
import { Suspense } from "react";
import OurServicesLoader from "./OurServicesLoader";
import OurServicesWrapper from "./OurServicesWrapper";

export default function OurServices() {
  const servicesPromise = getServices();

  return (
    <Suspense fallback={<OurServicesLoader />}>
      <OurServicesWrapper servicesPromise={servicesPromise} />
    </Suspense>
  );
}