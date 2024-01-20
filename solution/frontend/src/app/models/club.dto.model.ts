export class ClubDto {
    clubId: number;
    clubName: string | null;
    countryId: number;
}

export class WinDrawLoseStatisticsDto {
    year: number;
    wins: number;
    draws: number;
    loses: number;
}

export class AvgGoalsStatisticsDto {
    year: number;
    competition: string;
    avgGoals: number;
}