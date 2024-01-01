export class CompetitionDto {
    competitionId: string;
    countryId: number;
    name: string;
    seasons: number[];
}

export class CompetitionStatsDto {
    clubId: number;
    clubName: string;
    wins: number;
    draws: number;
    loses: number;
    scoreGoals: number;
    takenGoals: number;
    points: number;
}