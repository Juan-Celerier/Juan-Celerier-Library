export interface StatDTO {
    title: string;
    value: string;
    iconName?: string;
    change: string;
    changeType: "positive" | "negative" | "neutral";
    color: string;
}
export interface DashboardDTO {
    stats: StatDTO[];
    featuredBooks: BookDTO[];
}
export interface BookDTO {
    id?: string;
    title?: string;
    author?: string | {
        id?: string;
        name?: string;
    };
    availableCopies?: number;
    imageUrl?: string;
    image?: string;
    description?: string;
    rating?: number;
    genre?: string;
    status?: "AVAILABLE" | "BORROWED" | "UNKNOWN";
}
//# sourceMappingURL=dashboard.d.ts.map