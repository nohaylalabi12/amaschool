export interface StaffAbsenceRequest {
  id: number;                     // Identifiant unique
  staffAbsenceCode: string;        // Code unique pour l'absence du personnel
  absenceDate: Date;               // Date de l'absence
  absenceCause: string;            // Cause de l'absence
  startTime: string;               // Heure de début de l'absence (format string)
  endTime: string;                 // Heure de fin de l'absence (format string)
  absenceStatus: string;           // Statut de l'absence (e.g., 'Justified', 'Unjustified')
  administrativeStaffCode: string; // Code unique du personnel administratif
}
export interface StaffAbsenceResponse {
  staffAbsenceCode: string;        // Code unique pour l'absence du personnel
  absenceDate: Date;               // Date de l'absence
  absenceCause: string;            // Cause de l'absence
  startTime: string;               // Heure de début de l'absence
  endTime: string;                 // Heure de fin de l'absence
  absenceStatus: string;           // Statut de l'absence
  administrativeStaff: AdministrativeStaffRequest;  // Détails du personnel administratif
}
export interface AdministrativeStaffRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  administrativeStaffCode?: string;
}