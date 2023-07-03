import { FaPlus } from "react-icons/fa";
import { Link, useLoaderData } from "@remix-run/react";
// import BrandsList from "~/components/brands/BrandList";
// import { getBrands } from "~/data/brands.server";

export default function TicketsPage() {
  //   const brands = useLoaderData();
  //   const hasBrands = brands && brands.length > 0;
  return (
    <>
      <h1 className="text-white flex justify-center">Tickets Page Goes Here</h1>
      <p className="text-white flex justify-center">
        This page will have a filter and listing of all available tickets. All
        tickets for past games will be filtered out.
      </p>
      <main className="">
        {/* <div className="flex justify-center py-5">
          <Link to="add" className="">
            <span className="flex px-1 text-justify text-white border-2 rounded">
              <FaPlus className="text-white" />
              Add Brand
            </span>
          </Link>
        </div> */}

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
