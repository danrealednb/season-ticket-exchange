import ReservedTicketListItem from "./ReservedTicketListItem";

function ReservedTicketList({ tickets }) {
  return (
    <article>
      {/* <h2 className="text-white flex justify-center text-4xl underline py-5">
        My Reserved Tickets
      </h2> */}
      <ol
        id="expenses-list"
        className="space-y-5 grid items-center justify-center py-5"
      >
        {tickets.map((ticket) => (
          <li key={ticket.id} className="text-white">
            <ReservedTicketListItem id={ticket.id} ticket={ticket} />
          </li>
        ))}
      </ol>
    </article>
  );
}

export default ReservedTicketList;
