"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFineMock = createFineMock;
function createFineMock(opts = {}) {
    return {
        id: "fine-123",
        loanId: "loan-001",
        amount: 10.0,
        paid: false,
        paymentDate: undefined,
        createdAt: new Date(),
        ...opts,
    };
}
