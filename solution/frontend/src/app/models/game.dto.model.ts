export class GameDto {
    gameId: number;
    countryId: number;
    competitionId: string;
    competitionName: string;
    homeClubId: number;
    homeClubName: string | null;
    homeClubScore: number;
    awayClubId: number;
    awayClubName: string | null;
    awayClubScore: number;
    date: string;

    lineups: GameLineupModel[] = [];
    events: GameEventModel[] = [];
}

export class GameLineupModel {
    game_lineups_id: string;
    game_id: number;
    club_id: number;
    type: string;
    number: number;
    player_id: number;
    player_name: string;
    team_captain: boolean;
    position: LineupPositionType;
}

export class GameEventModel{
    game_event_id: string;
    date: string;
    game_id: number;
    minute: number;
    type: GameEventType;
    club_id: number;
    player_id: number;
    description: string;
    player_in_id: number;
    player_assist_id: number;
}

export enum GameEventType {
    Cards = "Cards",
    Goals = "Goals",
    Substitutions = "Substitutions",
    Shootout = "Shootout"
}

export enum LineupPositionType {
    "Left Midfield" = "Left Midfield",
    "Defensive Midfield" = "Defensive Midfield",
    "Centre-Forward" = "Centre-Forward",
    "Attacking Midfield" = "Attacking Midfield",
    "Centre-Back" = "Centre-Back",
    "Left-Back" = "Left-Back",
    "Right-Back" = "Right-Back",
    "Right Midfield" = "Right Midfield",
    "Goalkeeper" = "Goalkeeper",
    "Right Winger" = "Right Winger",
    "Left Winger" = "Left Winger",
    "Central Midfield" = "Central Midfield"
}