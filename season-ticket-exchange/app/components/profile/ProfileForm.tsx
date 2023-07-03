import {
  Link,
  Form,
  useNavigation,
  useLoaderData,
  useParams,
  useActionData,
} from "@remix-run/react";

function ProfileForm() {
  const profileData = useLoaderData();
  const validationErrors = useActionData();
  //   const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const defaultValues = profileData
    ? {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        paypal: profileData.paypal,
        zelle: profileData.zelle,
        venmo: profileData.venmo,
        section: profileData.section,
        row: profileData.row,
        seats: profileData.seats,
      }
    : {
        firstName: "",
        lastName: "",
        paypal: "",
        zelle: "",
        venmo: "",
        section: "",
        row: "",
        seats: "",
      };

  //   if (params.id && !profileData) {
  //     // invalid id
  //     return <p>Invalid User Profile Id</p>;
  //   }

  // const isOpenCBChecked = open_cb === true ? "true" : "false";
  return (
    <Form
      method="patch"
      className="form grid justify-center items-center py-5 space-y-5"
      id="collection-form"
    >
      <input
        type="text"
        id="firstName"
        name="firstName"
        required
        placeholder="First Name"
        defaultValue={defaultValues.firstName}
      />
      <input
        type="text"
        id="lastName"
        name="lastName"
        required
        placeholder="Last Name"
        defaultValue={defaultValues.lastName}
      />

      <input
        type="text"
        id="paypal"
        name="paypal"
        placeholder="Paypal Email"
        defaultValue={defaultValues.paypal}
      />

      <input
        type="text"
        id="zelle"
        name="zelle"
        placeholder="Zelle"
        defaultValue={defaultValues.zelle}
      />

      <input
        type="text"
        id="venmo"
        name="venmo"
        placeholder="Venmo"
        defaultValue={defaultValues.venmo}
      />

      <input
        type="text"
        id="section"
        name="section"
        placeholder="Section"
        defaultValue={defaultValues.section}
      />

      <input
        type="text"
        id="row"
        name="row"
        placeholder="Row"
        defaultValue={defaultValues.row}
      />
      <input
        type="text"
        id="seats"
        name="seats"
        placeholder="Seats"
        defaultValue={defaultValues.seats}
      />
      <div className="flex space-x-2 justify-center items-center text-white">
        <label>Become a Verified Seller</label>
        {/* TODO: If user is in pending verification show special icon. TODO: If
        user is approved, show different special icon TODO: If user is not
        approved or pending, show button */}
        <Form method="post" id="verifyseller-form">
          <input
            type="hidden"
            name="paypal"
            id="paypal"
            defaultValue={profileData.paypal}
          />
          <input
            type="hidden"
            name="zelle"
            id="zelle"
            defaultValue={profileData.zelle}
          />
          <input
            type="hidden"
            name="venmo"
            id="venmo"
            defaultValue={profileData.venmo}
          />
          <button className="rounded border-2 px-1">Verify</button>
        </Form>
      </div>

      {validationErrors && (
        <ul className="text-white">
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions flex justify-center items-center py-5 space-x-2">
        <button
          disabled={isSubmitting}
          className="px-1 text-white border-2 rounded"
        >
          {isSubmitting ? "Saving..." : "Update Profile"}
        </button>
        <button className="px-1 text-white border-2 rounded">
          <Link to="..">{isSubmitting ? "Cancelling..." : "Cancel"}</Link>
        </button>
      </div>
    </Form>
  );
}

export default ProfileForm;
