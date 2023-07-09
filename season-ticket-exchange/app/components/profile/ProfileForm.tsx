import {
  Link,
  Form,
  useNavigation,
  useLoaderData,
  useParams,
  useActionData,
  useFetcher,
} from "@remix-run/react";

import {
  SECTION,
  seatMap,
  venue,
  getSectionRows,
  getRowSeats,
  getSectionInfo,
} from "~/data/venue";
import { useState } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";

function ProfileForm() {
  const profileData = useLoaderData();
  const validationErrors = useActionData();
  // console.log("UI VALIDATION ERRORS", validationErrors);
  // const params = useParams();
  // const fetcher = useFetcher();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const userVerified = profileData.verified === "VERIFIED";
  const userPendingVerification =
    profileData.verified === "PENDING_VERIFICATION";
  const userNotVerified = profileData.verified === "NOT_VERIFIED";

  // function verifyUserAsSellerItemHandler() {
  //   fetcher.submit(
  //     {
  //       intent: "verify",
  //     },
  //     {
  //       method: "post",
  //       action: `/profile/${params.id}`,
  //     }
  //   );
  // }
  // console.log("SEATS FROM DB", profileData.seats);
  // console.log("SEATS FROM DB As STRING", profileData.seats.join(","));

  const defaultValues = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    paypal: profileData.paypal,
    zelle: profileData.zelle,
    venmo: profileData.venmo,
    section: profileData.section || "Default Section",
    row: profileData.row,
    // seats: "",
    seats: profileData.seats.join(","), // seats saved in db coming in as array
    rowsies: getSectionRows(profileData.section || "Default Section"),
    aisleSeat: profileData.aisleSeat,
    discountCodeIncluded: profileData.discountCodeIncluded,
    suite: profileData.suite,
    chaseBridge: profileData.chaseBridge,
    numberOfSeats: getRowSeats(profileData.section || "Default Section"),
    // rowsies: [],
  };
  // : {
  //     firstName: "",
  //     lastName: "",
  //     paypal: "",
  //     zelle: "",
  //     venmo: "",
  //     section: "",
  //     row: "",
  //     seats: "",
  //     rowsies: [],
  //     aisleSeat: false,
  //     discountCodeIncluded: false,
  //     suite: false,
  //     chaseBridge: false,
  //     numberOfSeats: 1,
  //     // rowsies: []
  //   };

  //   if (params.id && !profileData) {
  //     // invalid id
  //     return <p>Invalid User Profile Id</p>;
  //   }

  // const isOpenCBChecked = open_cb === true ? "true" : "false";

  const [section, setSection] = useState(defaultValues.section);
  const [rowsies, setRows] = useState(defaultValues.rowsies);
  const [row, setRow] = useState(defaultValues.row);
  // const [seats, setSeats] = useState(defaultValues.seats);
  const [row_seats, setRowSeats] = useState(defaultValues.numberOfSeats);
  // const [numberOfSeats] = useState(defaultValues.numberOfSeats);

  // console.log("SECTION", section);
  const handleChangeSection = (e) => {
    const section = e.target.value;
    setSection(section);
    const sectionInfo = getSectionRows(section);
    // console.log("SECTION INFO", sectionInfo);
    setRows(sectionInfo);
    const row_seats = getRowSeats(section);
    setRowSeats(row_seats);

    const specialSectionInfo = getSectionInfo(section);
    if (specialSectionInfo.suite) {
      setSuiteCB(true);
    } else {
      setSuiteCB(false);
    }
    if (specialSectionInfo.chaseBridge) {
      setChaseBridgeCB(true);
    } else {
      setChaseBridgeCB(false);
    }
  };
  const handleRowSelection = (e) => {
    setRow(e.target.value);
  };

  const availableSeats = `Available Seats (1-${row_seats})`;

  const [aisleSeat_cb, setAisleSeatCB] = useState(defaultValues.aisleSeat);
  const handleAisleSeatCB = (e) => {
    console.log("Selected Aisle Seat", e.target.checked);
    setAisleSeatCB(e.target.checked);
  };

  const [discountCode_cb, setDiscountCodeCB] = useState(
    defaultValues.discountCodeIncluded
  );

  const handleDiscountCodeCB = (e) => {
    setDiscountCodeCB(e.target.checked);
  };

  const [suite_cb, setSuiteCB] = useState(defaultValues.suite);

  // const handleSuiteCB = (e) => {
  //   const sectionInfo = getSectionInfo(section);
  //   if (sectionInfo.suite) {
  //     setSuiteCB(e.target.checked);
  //   }
  // };

  const [chaseBridge_cb, setChaseBridgeCB] = useState(
    defaultValues.chaseBridge
  );

  // const handleChaseBridgeCB = (e) => {
  //   const sectionInfo = getSectionInfo(section);
  //   if (sectionInfo.chaseBridge) {
  //     setChaseBridgeCB(e.target.checked);
  //   }
  // };

  return (
    <div>
      <Form
        method="patch"
        className="form grid justify-center items-center py-5 space-y-5"
        id="collection-form"
      >
        <label className="text-white text-center" htmlFor="">
          {profileData.email}
        </label>
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

        {/* <input
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
      /> */}

        <p className="grid justify-center">
          <label htmlFor="name" className="text-white py-2 text-center">
            Choose Section
          </label>
          <select
            id="section"
            name="section"
            onChange={handleChangeSection}
            className="border-2 border-white rounded text-center w-80"
            defaultValue={section}
          >
            {venue.map((section: SECTION) => {
              return (
                <option key={section.section} value={section.section}>
                  {section.section}
                </option>
              );
            })}
          </select>
        </p>
        <p className=" text-center underline text-red font-bold">
          <a href={seatMap(section)} target="_blank" rel="noopener noreferrer">
            See Seats On Map
          </a>
        </p>

        <p className="grid justify-center">
          <label htmlFor="name" className="text-white py-2 text-center">
            Choose Row
          </label>
          <select
            id="row"
            name="row"
            onChange={handleRowSelection}
            className="border-2 border-white rounded text-center w-80"
            defaultValue={row}
          >
            {rowsies.map((item: any) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </p>

        <label className="text-white text-center">Seats (1-{row_seats})</label>

        <input
          type="text"
          id="seats"
          name="seats"
          placeholder={availableSeats}
          defaultValue={defaultValues.seats}
        />
        <label className="text-white text-center">
          Separate Seats With Comma (Example: 5,6,7,8)
        </label>

        <div className="grid justify-center items-center space-x-2 py-2">
          <div className="flex justify-center items-center space-x-2">
            <input
              id="aisleSeat"
              type="checkbox"
              name="aisleSeat"
              className="rounded"
              checked={aisleSeat_cb}
              value={aisleSeat_cb === true ? "true" : "false"}
              onChange={handleAisleSeatCB}
            />
            <label htmlFor="finished-radio" className="text-white">
              Aisle Seat
            </label>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <input
              id="discountCodeIncluded"
              type="checkbox"
              name="discountCodeIncluded"
              className="rounded"
              checked={discountCode_cb}
              value={discountCode_cb === true ? "true" : "false"}
              onChange={handleDiscountCodeCB}
            />
            <label htmlFor="finished-radio" className="text-white">
              Discount Codes
            </label>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <input
              id="suite"
              type="checkbox"
              name="suite"
              className="rounded"
              checked={suite_cb}
              disabled
              value={suite_cb === true ? "true" : "false"}
            />
            <label htmlFor="finished-radio" className="text-white">
              Suite
            </label>
            <input
              type="hidden"
              name="suite"
              id="suite"
              defaultValue={suite_cb === true ? "true" : "false"}
            />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <input
              id="chaseBridge"
              type="checkbox"
              name="chaseBridge"
              className="rounded"
              checked={chaseBridge_cb}
              disabled
              value={chaseBridge_cb === true ? "true" : "false"}
            />
            <label htmlFor="finished-radio" className="text-white">
              Chase Bridge
            </label>
            <input
              type="hidden"
              name="chaseBridge"
              id="chaseBridge"
              defaultValue={chaseBridge_cb === true ? "true" : "false"}
            />
          </div>
        </div>

        {validationErrors && (
          <ul className="text-white text-center">
            <div className="flex justify-center items-center text-center">
              <FaExclamationCircle className="text-amber" />
            </div>

            {Object.values(validationErrors).map((error) => (
              <li className="italic" key={error}>
                {error}
              </li>
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

      {userNotVerified && (
        <div className="grid space-x-2 justify-center items-center text-center text-white">
          <label className="font-bold underline py-2">
            Become a Verified Seller
          </label>
          <p className="text-wrap w-80 py-2">
            You need to have your profile completely filled out and saved before
            you can verify. At least one payment option is required. After you
            have verified your information, please send a proof of invoice for
            your season tickets to{" "}
            <a
              className="underline"
              href="mailto:djreale@gmail.com?subject=NYR%20Ticket%20Verification"
            >
              djreale@gmail.com
            </a>
          </p>
          <Form
            method="post"
            className="form grid justify-center items-center py-5 space-y-5"
            id="verify-form"
          >
            <button
              disabled={isSubmitting}
              className="rounded border-2 px-1"
              // onClick={verifyUserAsSellerItemHandler}
            >
              {isSubmitting ? "Verifying..." : "Verify Now"}
            </button>
            <div className="flex justify-center items-center text-center space-x-2">
              <p className="text-white">Not Verified</p>
              <FaTimesCircle className="text-red" />
            </div>
            {validationErrors && (
              <ul className="text-white text-center">
                <div className="flex justify-center items-center text-center">
                  <FaExclamationCircle className="text-amber" />
                </div>

                {Object.values(validationErrors).map((error) => (
                  <li className="italic" key={error}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </Form>
        </div>
      )}

      {userVerified && (
        <div className="flex justify-center items-center text-center space-x-2">
          <p className="text-white">Verified User</p>
          <FaCheckCircle className="text-green" />
        </div>
      )}

      {userPendingVerification && (
        <div className="flex justify-center items-center text-center space-x-2">
          <p className="text-white">Pending Verification</p>
          <FaExclamationCircle className="text-amber" />
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
