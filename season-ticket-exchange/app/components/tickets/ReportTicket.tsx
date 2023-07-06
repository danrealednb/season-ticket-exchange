import {
  Form,
  useNavigation,
  useParams,
  Link,
  useLoaderData,
} from "@remix-run/react";

function ReportTicket() {
  const params = useParams();
  const ticketId = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  function ReportTicketItemHandler() {
    var doc;
    const proceed = confirm(
      `Are you sure? Do you want to report these tickets?`
    );

    if (proceed) {
      doc = "Thank you for reporting these tickets!";
      document.getElementById("report").value = "";
    } else {
      doc = "";
    }
    document.getElementById("g").innerHTML = doc;
  }

  return (
    <>
      <Form
        method="post"
        className="form grid justify-center items-center py-5 space-y-5"
        id="collection-form"
      >
        <textarea
          className="w-80"
          id="report"
          name="report"
          required
          placeholder="Why are you reporting these tickets?"
        />

        <div className="form-actions flex justify-center items-center py-5 space-x-2">
          <button
            disabled={isSubmitting}
            className="px-1 text-white border-2 rounded"
            onClick={ReportTicketItemHandler}
          >
            {isSubmitting ? "Reporting..." : "Report Tickets"}
          </button>
          <button
            className="px-1 text-white border-2 rounded"
            // onClick={() => setButtonText("Cancelling...")}
          >
            {/* {buttonText} */}
            <Link to="..">{isSubmitting ? "Cancelling..." : "Cancel"}</Link>
          </button>
        </div>
        <div>
          <p className="text-white text-center" id="g"></p>
          <Link
            className="text-white text-center flex justify-center underline"
            to=".."
          >
            Back To Ticket Details
          </Link>
        </div>
      </Form>
    </>
  );
}

export default ReportTicket;
