export class PlayerDto {
    id: number;
    fullName: string;
    position: string;
    subPosition: string;
    imageUrl: string;
}

export class PlayerDetailDto {
    id: number;
    fullName: string;
    clubId: number;
    clubName: string | null;
    countryName: string;
    dateOfBirth: Date;
    position: string;
    subPosition: string;
    foot: string;
    height: string;
    contractExpirationDate: Date;
    marketValue: number;
    imageUrl: string;
}

export class GoalCardsStatisticsDto {
    year: number;
    totalGoals: number;
    totalAssists: number;
    totalYellowCards: number;
    totalRedCards: number;
}

export class MarketValueStatisticsDto {
    date: Date;
    market_value_in_eur: number;
}