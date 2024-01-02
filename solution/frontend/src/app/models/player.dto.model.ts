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
    countryName: string;
    dateOfBirth: Date;
    position: string;
    subPosition: string;
    foot: string;
    height: string;
    marketValue: number;
    imageUrl: string;
}