// import BrandForm from "~/components/brands/BrandForm";
// import { addBrand } from "~/data/brands.server";
import { redirect } from "@remix-run/node";

export default function AddBrandPage() {
  return (
    <>
      <h1 className="text-white text-xl flex justify-center py-5">
        Sell Tickets
      </h1>
      {/* <BrandForm /> */}
    </>
  );
}

export async function action({ request }) {
  //   const formData = await request.formData();
  //   const brandData = Object.fromEntries(formData);
  //   // console.log(eventData, formData)
  //   try {
  //     await addBrand(brandData);
  //     return redirect("/brands");
  //   } catch (error) {
  //     if (error.status === 422 || error.status === 401) {
  //       return { brand: error.message };
  //     }
  //   }
  return null;
}
