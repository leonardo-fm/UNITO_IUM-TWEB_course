import { CompetitionModel } from "./competition.model";

export class ClubModel {
    club_id: number;
    club_code: string;
    name: string;
    domestic_competition_id: string;
    total_market_value: string;
    squad_size: number;
    average_age: number;
    foreigners_number: number;
    foreigners_percentage: number;
    national_team_players: number;
    stadium_name: string;
    stadium_seats: number;
    net_transfer_record: string;
    coach_name: string;
    last_season: number;
    url: string;

    competition: CompetitionModel;
}