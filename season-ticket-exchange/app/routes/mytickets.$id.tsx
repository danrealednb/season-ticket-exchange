import { redirect } from "@remix-run/node";
// import BrandForm from "~/components/brands/BrandForm";
// import { deleteBrand, updateBrand, getBrand } from "~/data/brands.server";

export default function UpdateTicketsPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5">
        Update Tickets
      </h1>
      {/* <BrandForm /> */}
    </>
  );
}

export async function action({ params, request }) {
  //   const brandId = params.id;
  //   if (request.method === "PATCH") {
  //     const formData = await request.formData();
  //     const brandData = Object.fromEntries(formData);
  //     await updateBrand(brandId, brandData);
  //     return redirect("/brands");
  //   } else if (request.method === "DELETE") {
  //     await deleteBrand(brandId);
  //     return redirect("/brands");
  //     // return { deletedId: data };
  //   }
  return null;
}

export async function loader({ params }) {
  //   const brandId = params.id;
  //   const brand = await getBrand(brandId);
  //   if (!brand) {
  //     throw new Response("Brand not found", { status: 404 });
  //   }
  //   return brand;
  return null;
}
