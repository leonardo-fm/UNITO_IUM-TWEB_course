import { ClubModel } from "./club.model";
import { CompetitionModel } from "./competition.model";

export class GameModel {
    game_id: number;
    competition_id: string;
    season: number;
    round: string;
    date: Date;
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
}

export class GameHistoryModel {
    date: Date;
    games: GameModel[]
}