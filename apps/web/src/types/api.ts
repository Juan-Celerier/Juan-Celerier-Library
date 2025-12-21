export interface StatDTO {
  title: string;
  value: string;
  iconName?: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  color: string;
}

export interface BookDTO {
  id: string;
  title: string;
  author?: { name?: string } | string;
  availableCopies?: number;
  imageUrl?: string;
  rating?: number;
  genre?: string;
  status?: "AVAILABLE" | "BORROWED" | "UNKNOWN";
}

export interface DashboardDTO {
  stats: StatDTO[];
  featuredBooks: BookDTO[];
}
