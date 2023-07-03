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
        My Tickets Page Goes Here
      </h1>
      <p className="text-white flex justify-center">
        Add, Edit, Delete Tickets.
      </p>
      <main className="">
        <div className="flex justify-center items-center py-5">
          <Link to="add" className="">
            <span className="flex px-1 text-justify items-center space-x-2 text-white border-2 rounded">
              <FaPlus className="text-white" /> Add Tickets
              <FaTicketAlt className="text-white" />
            </span>
          </Link>
        </div>

        {/* {hasBrands && <BrandsList brands={brands} />}
        {!hasBrands && (
          <section id="no-events" className="flex justify-center">
            <div className="grid justify-center text-center">
              <h1 className="text-white">No brands found</h1>
              <p className="text-white">
                Start{" "}
                <Link to="add" className="underline">
                  adding some
                </Link>{" "}
                today.
              </p>
            </div>
          </section>
        )} */}
      </main>
    </>
  );
}

export async function loader() {
  //   const brands = await getBrands();
  //   return brands;
  return null;
}
