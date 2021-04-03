export interface Course {
    id: string;
    name: string;
    building: string;
    room: string;
    days: Array<number>;
    startTime: FireDate;
    endTime: FireDate;
    profName: string;
    profEmail: string;
    profBuilding: string;
    profRoom: string;
    profDays: Array<number>;
    profStartTime: Date;
    profEndTime: Date;
    color: string;
}

export class FireDate {
    seconds: number;

    constructor(seconds: number) {
        this.seconds = seconds;
    }
}