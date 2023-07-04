import TicketListITem from "./TicketListItem";

function TicketList({ tickets }) {
  return (
    <article>
      <h2 className="text-white flex justify-center text-4xl underline py-5">
        My Tickets
      </h2>
      <ol
        id="expenses-list"
        className="space-y-5 grid items-center justify-center py-5"
      >
        {tickets.map((ticket) => (
          <li key={ticket.id} className="text-white">
            <TicketListITem id={ticket.id} ticket={ticket} />
          </li>
        ))}
      </ol>
    </article>
  );
}

export default TicketList;
