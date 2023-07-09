import { Link, useFetcher, Form } from "@remix-run/react";
import { GAME, schedule } from "~/data/schedule";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { redirect } from "@remix-run/node";

function AdminListItem({ id, user }) {
  const fetcher = useFetcher();

  if (fetcher.state !== "idle") {
    return (
      <article className="expense-item locked">
        <p className="text-white">Updating User Account {user.email}...</p>
      </article>
    );
  }

  const emailContact = `mailto:${user.email}?subject=Rangers%20Tickets`;

  return (
    <Form
      method="post"
      onSubmit={(event) => {
        if (!confirm("Are you sure?")) {
          event.preventDefault();
        }
      }}
    >
      <article className="expense-item">
        <div className="grid justify-center items-center text-center text-white">
          <div className="flex justify-center space-x-2">
            <label className="font-bold">First Name:</label>
            <p>{user.firstName}</p>
          </div>
          <div className="flex justify-center space-x-2">
            <label className="font-bold">Last Name:</label>
            <p>{user.lastName}</p>
          </div>
          <div className="flex justify-center space-x-2">
            <label className="font-bold">Email:</label>
            <p>{user.email}</p>
          </div>
          <div className="flex justify-center space-x-2">
            <label className="font-bold">Section:</label>
            <p>{user.section}</p>
          </div>
          <div className="flex justify-center space-x-2">
            <label className="font-bold">Row</label>
            <p>{user.row}</p>
          </div>

          <div className="flex justify-center space-x-2">
            <label className="font-bold">Seats</label>
            <p>{user.seats.join(",")}</p>
          </div>

          <div className="flex justify-center space-x-2">
            <label className="font-bold">PayPal</label>
            <p>{user.paypal}</p>
          </div>
          <div className="flex justify-center space-x-2">
            <label className="font-bold">Zelle</label>
            <p>{user.zelle}</p>
          </div>
          <div className="flex justify-center space-x-2">
            <label className="font-bold">Venmo</label>
            <p>{user.venmo}</p>
          </div>
        </div>
        <menu className="expense-actions grid justify-center items-center py-5 space-x-2">
          {/* <div className="flex justify-center items-center text-center space-x-2 py-2">
          <button className="px-1 py-1 bg-dark-blue text-white rounded">
            <Link to={id}>Edit</Link>
          </button>
          <button
            className="px-1 py-1 bg-red text-white rounded"
            onClick={deleteExpenseItemHandler}
          >
            Delete
          </button>
        </div> */}

          {/* if ticket is reserved by a buyer but not paid yet */}
          {/* {ticketStatusReserved && paidStatusPending && ( */}
          <input type="hidden" name="userId" id="userId" value={user.id} />
          <div className="grid justify-center items-center text-center space-x-2 py-2">
            <button
              //   onClick={VerifyUserItemHandler}
              className="rounded px-2 bg-red"
            >
              User Verified
            </button>
          </div>
          {/* )} */}

          {/* if ticket is paid by buyer but seller has not accepted or acknowledged payment yet */}
          {/* {ticketStatusPending && paidStatusSellerAcceptance && (
          <div className="grid justify-center items-center text-center space-x-2 py-2">
            <button
              onClick={SellTicketItemHandler}
              className="rounded px-2 bg-red"
            >
              Accept Payment
            </button>
            <div className="flex justify-center items-center text-center space-x-2 py-2">
              <FaExclamationCircle className="text-amber" />
              <p className="text-amber italic">Reserved by {ticket.buyer}</p>
            </div>
          </div>
        )} */}

          {/* if seller has accepted received payment and ticket is officially sold */}
          {/* {ticketStatusSold && paidStatusPaymentComplete && (
          <div className="flex justify-center items-center text-center space-x-2">
            <FaCheckCircle className="text-green" />
            <p className="text-green italic">Purchased by {ticket.buyer}</p>
          </div>
        )} */}

          {/* {ticketStatusReserved && (
          <div className="expense-actions flex justify-center items-center space-x-2">
            <button
              className="px-1 py-1 bg-red text-white rounded"
              onClick={unReserveTicketItemHandler}
            >
              Market
            </button>
            <button
              className="px-1 py-1 bg-red text-white rounded"
              onClick={SellTicketItemHandler}
            >
              Sold
            </button>
            <a className="underline" href={emailContact}>
              Email Buyer
            </a>
          </div>
        )}
        {ticketStatus === "SOLD" && (
          <p className="font-bold text-gray">Sold ({ticket.buyer})</p>
        )} */}
          <a className="underline text-center" href={emailContact}>
            Email Seller
          </a>
        </menu>
      </article>
    </Form>
  );
}

export default AdminListItem;
