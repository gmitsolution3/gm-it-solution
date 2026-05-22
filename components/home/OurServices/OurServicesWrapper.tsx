import { IService } from "@/types";
import OurServicesClient from "./OurServicesClient";

interface IProps {
  servicesPromise: Promise<IService[]>;
}

export default async function OurServicesWrapper({ servicesPromise }: IProps) {
  const services = await servicesPromise;

  return <OurServicesClient services={services} />;
}