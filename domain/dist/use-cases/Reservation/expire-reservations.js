export async function expireReservations(deps) {
    const { reservationRepository } = deps;
    const allReservations = await reservationRepository.findAll();
    const now = Date.now();
    const expiredReservations = [];
    for (const reservation of allReservations) {
        const isPending = reservation.status === "PENDING";
        const isExpired = reservation.expirationDate.getTime() < now;
        if (isPending && isExpired) {
            const updated = await reservationRepository.update(reservation.id, {
                ...reservation,
                status: "EXPIRED",
            });
            expiredReservations.push(updated);
        }
    }
    return expiredReservations;
}
