import { prisma } from "./database.server";
import { gameInfo } from "./schedule";

export async function addTicket(ticketData, userId) {
  const filteredGameInfo = gameInfo(ticketData.game);

  try {
    return await prisma.ticket.create({
      data: {
        game: parseInt(ticketData.game),
        section: ticketData.section,
        row: ticketData.row,
        seats: ticketData.seats,
        price: +ticketData.price,
        aisleSeat: ticketData.aisleSeat,
        discountCodeIncluded: ticketData.discountCodeIncluded,
        status: "AVAILABLE",
        userId,
        seller: ticketData.seller,
        // userVerified: ticketData.userVerified,
        notes: ticketData.notes,
        gameDate: new Date(filteredGameInfo.date),
        suite: ticketData.suite,
        chaseBridge: ticketData.chaseBridge,
        paypal: ticketData.paypal,
        zelle: ticketData.zelle,
        venmo: ticketData.venmo,
        totalPrice: +ticketData.totalPrice,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add tickets.");
  }
}

export async function getUserTickets(userId) {
  try {
    const tickets = await prisma.ticket.findMany({
      where: { userId },
      orderBy: { game: "asc" },
    });
    return tickets;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user tickets.");
  }
}

export async function deleteTicket(id) {
  try {
    const ticket = await prisma.ticket.delete({
      where: { id },
    });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete ticket.");
  }
}

export async function updateTicket(id, ticketData) {
  const filteredGameInfo = gameInfo(ticketData.game);
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        game: parseInt(ticketData.game),
        // section: ticketData.section,
        // row: ticketData.row,
        seats: ticketData.seats,
        price: +ticketData.price,
        // aisleSeat: ticketData.aisleSeat,
        // discountCodeIncluded: ticketData.discountCodeIncluded,
        notes: ticketData.notes,
        gameDate: new Date(filteredGameInfo.date),
        // suite: ticketData.suite,
        // chaseBridge: ticketData.chaseBridge,
        totalPrice: +ticketData.totalPrice,
      },
    });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update ticket.");
  }
}

export async function getTicket(id) {
  try {
    const ticket = await prisma.ticket.findFirst({
      where: { id },
    });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get ticket.");
  }
}

export async function getTicketsCount() {
  const ticketsCount = await prisma.ticket.count({});
  return ticketsCount;
}

export async function getAvailableTicketsSearch(game) {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { game: "asc" },
      where: {
        game: game,
      },
    });
    return tickets;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get tickets.");
  }
}
export async function getAvailableTickets() {
  const todaysDate = new Date();
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { game: "asc" },
      where: {
        gameDate: { gte: todaysDate },
      },
    });
    return tickets;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get tickets.");
  }
}
export async function reserveTicket(id, userEmail) {
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        // reservedUser: userId,
        buyer: userEmail,
        status: "RESERVED",
        paid: "PENDING_PAYMENT",
      },
    });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reserve ticket.");
  }
}

export async function unReserveTicket(id) {
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      // data: {
      //   reservedUser: null,
      // },
      data: {
        buyer: {
          set: "",
        },
        status: "AVAILABLE",
        paid: "AVAILABLE",
      },
    });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to unreserve ticket.");
  }
}

export async function reportTickets(ticketId, ticketData, userId) {
  try {
    return await prisma.reportedTickets.create({
      data: {
        ticketId: ticketId,
        report: ticketData.report,
        reportedUser: userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to report tickets.");
  }
}
export async function getUsersReservedTickets(userEmail) {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { gameDate: "asc" },
      where: {
        buyer: userEmail,
      },
    });
    return tickets;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get users reserved tickets.");
  }
}

export async function buyerPaidForTickets(id) {
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        paid: "PENDING_SELLER_ACCEPTANCE",
        status: "PENDING",
      },
    });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Failed for buyer to pay for tickets.");
  }
}

export async function sellerReceivedPaymentForTickets(id) {
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        paid: "PAYMENT_COMPLETE",
        status: "SOLD",
      },
    });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Failed for seller to receive payment for tickets.");
  }
}
