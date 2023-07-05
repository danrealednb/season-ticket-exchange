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
        // userVerified: ticketData.userVerified,
        notes: ticketData.notes,
        gameDate: new Date(filteredGameInfo.date),
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
        section: ticketData.section,
        row: ticketData.row,
        seats: ticketData.seats,
        price: +ticketData.price,
        aisleSeat: ticketData.aisleSeat,
        discountCodeIncluded: ticketData.discountCodeIncluded,
        notes: ticketData.notes,
        gameDate: new Date(filteredGameInfo.date),
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

export async function getAvailableTickets() {
  const todaysDate = new Date();
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { game: "asc" },
      where: { gameDate: { gte: todaysDate } },
    });
    return tickets;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get tickets.");
  }
}
export async function reserveTicket(id, userId) {
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        reservedUser: userId,
      },
    });
    return ticket;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete ticket.");
  }
}
