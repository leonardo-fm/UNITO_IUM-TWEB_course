import { ClubModel } from "./club.model";
import { CompetitionModel } from "./competition.model";

export class GameModel {
    game_id: number;
    competition_id: string;
    season: number;
    round: string;
    date: string;
    home_club_id: number;
    away_club_id: number;
    home_club_goals: number;
    away_club_goals: number;
    home_club_position: number;
    away_club_position: number;
    home_club_manager_name: string;
    away_club_manager_name: string;
    stadium: string;
    attendance: number;
    referee: string;
    url: string;
    home_club_formation: string;
    away_club_formation: string;
    home_club_name: string;
    away_club_name: string;
    aggregate: string;
    competition_type: string;

    competition: CompetitionModel;
    home_club: ClubModel;
    away_club: ClubModel;
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