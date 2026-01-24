export function createReservationRepositoryMock(reservations = []) {
    return {
        reservations,
        async findAll() {
            return this.reservations;
        },
        async findById(reservationId) {
            return this.reservations.find((r) => r.id === reservationId) || null;
        },
        async findByBookId(bookId) {
            return this.reservations.filter((r) => r.bookId === bookId);
        },
        async findByBorrowerId(borrowerId) {
            return this.reservations.filter((r) => r.borrowerId === borrowerId);
        },
        async create(reservation) {
            const newReservation = {
                id: `reservation-${Date.now()}`,
                ...reservation,
            };
            this.reservations.push(newReservation);
            return newReservation;
        },
        async update(id, updateData) {
            const index = this.reservations.findIndex((r) => r.id === id);
            if (index === -1) {
                throw new Error("Reservation not found");
            }
            this.reservations[index] = {
                ...this.reservations[index],
                ...updateData,
            };
            return this.reservations[index];
        },
        async delete(reservationId) {
            this.reservations = this.reservations.filter((r) => r.id !== reservationId);
        },
        async cancelReservation(id) {
            const reservation = await this.findById(id);
            if (!reservation) {
                throw new Error("Reservation not found");
            }
            reservation.status = "CANCELLED";
            return reservation;
        },
    };
}
