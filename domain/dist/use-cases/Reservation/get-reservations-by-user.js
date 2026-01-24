export async function getReservationsByUser(deps, borrowerId) {
    const { reservationRepository } = deps;
    const reservations = await reservationRepository.findByBorrowerId(borrowerId);
    return reservations;
}
