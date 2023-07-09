function isValidEmail(value) {
  return value && value.includes("@");
}

function isValidPassword(value) {
  return value && value.trim().length >= 7;
}

export function validateCredentials(input) {
  let validationErrors = {};

  if (!isValidEmail(input.email)) {
    validationErrors.email = "Invalid email address.";
  }

  if (!isValidPassword(input.password)) {
    validationErrors.password =
      "Invalid password. Must be at least 7 characters long.";
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

// export function validateProfileSeatInformation(input) {
//   let validationErrors = {};
//   const sectionExists = input.section && input.section.length > 0;
//   const rowExists = input.row && input.row.length > 0;
//   const seatsExists = input.seats && input.seats.length > 0;

//   if (!sectionExists) {
//     validationErrors.section = "Invalid section information";
//   }
//   if (!rowExists) {
//     validationErrors.row = "Invalid row information";
//   }
//   if (!seatsExists) {
//     validationErrors.seats = "Invalid seat information";
//   }

//   if (Object.keys(validationErrors).length > 0) {
//     throw validationErrors;
//   }
// }

export function validateUpdateProfileSeatInformation(input) {
  let validationErrors = {};
  const sectionExists = input.section && input.section.length > 0;
  const rowExists = input.row && input.row.length > 0;
  const seatsExists = input.seats && input.seats[0].length > 0;

  if (!sectionExists) {
    validationErrors.section = "Invalid section information";
  }
  if (!rowExists) {
    validationErrors.row = "Invalid row information";
  }
  if (!seatsExists) {
    validationErrors.seats = "Invalid seat information";
  }
  // console.log("Seat Validation Errors", validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}

export function validateProfileSellerVerification(input) {
  let validationErrors = {};
  const paypalExists = input.paypal && input.paypal.length > 0;
  const zelleExists = input.zelle && input.zelle.length > 0;
  const venmoExists = input.venmo && input.venmo.length > 0;

  if (!paypalExists) {
    validationErrors.paypal = "Invalid paypal information";
  }
  if (!zelleExists) {
    validationErrors.zelle = "Invalid zelle information";
  }
  if (!venmoExists) {
    validationErrors.venmo = "Invalid venmo information";
  }
  // console.log(validationErrors);

  if (Object.keys(validationErrors).length === 3) {
    throw validationErrors;
  }
  // return validationErrors;
}
