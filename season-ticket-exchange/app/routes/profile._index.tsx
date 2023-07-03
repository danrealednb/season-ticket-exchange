import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { Link, useLoaderData } from "@remix-run/react";
// import BrandsList from "~/components/brands/BrandList";
// import { getBrands } from "~/data/brands.server";

export default function MyTicketsPage() {
  //   const brands = useLoaderData();
  //   const hasBrands = brands && brands.length > 0;
  return (
    <>
      <h1 className="text-white flex justify-center">
        My Profile Page Goes Here
      </h1>
      <p className="text-white flex justify-center">
        Edit Payment Options and Season tickets/seats.
      </p>
    </>
  );
}

export async function loader() {
  //   const brands = await getBrands();
  //   return brands;
  return null;
}
