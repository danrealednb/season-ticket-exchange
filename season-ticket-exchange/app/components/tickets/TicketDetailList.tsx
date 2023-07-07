import TicketDetailListItem from "./TicketDetailListItem";

function TicketDetailList({ tickets }) {
  return (
    <article>
      <h2 className="text-white flex justify-center text-4xl underline py-5">
        Available Tickets
      </h2>
      <ol
        id="expenses-list"
        className="space-y-5 grid items-center justify-center py-5"
      >
        {tickets.map((ticket) => (
          <li key={ticket.id} className="text-white">
            <TicketDetailListItem id={ticket.id} ticket={ticket} />
          </li>
        ))}
      </ol>
    </article>
  );
}

export default TicketDetailList;
