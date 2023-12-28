import { ClubModel } from "./club.model";
import { CompetitionModel } from "./competition.model";

export class PlayerModel {
    player_id: number;
    first_name: string;
    last_name: string;
    name: string;
    last_season: number;
    current_club_id: number;
    player_code: string;
    country_of_birth: string;
    city_of_birth: string;
    country_of_citizenship: string;
    date_of_birth: Date;
    sub_position: string;
    position: string;
    foot: string;
    height_in_cm: number;
    market_value_in_eur: number;
    highest_market_value_in_eur: number;
    contract_expiration_date: Date;
    agent_name: string;
    image_url: string;
    url: string;
    current_club_domestic_competition_id: string;
    current_club_name: string;

    current_club: ClubModel;
    current_club_domestic_competition: CompetitionModel;
}