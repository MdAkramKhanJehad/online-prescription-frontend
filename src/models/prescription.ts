export class Prescription{
       pId: number;
       patientName: string;
       patientAge: number;
       dateTime: Date;
       doctorId: number;
       doctorName: string;
       medicineIdsList: number[] = [];
       medicinesName: string;
}