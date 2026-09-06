import { AbsenError } from './errors.js';

// Dipakai route handler (bukan lib/absen sendiri) untuk memetakan
// AbsenError -> respons JSON {error} dengan status HTTP yang tepat --
// dipakai bersama oleh /api/kehadiran/checkin dan /checkout supaya
// bentuknya tidak diduplikasi di kedua route.
export function statusUntukError(error) {
  return error instanceof AbsenError ? 400 : 500;
}
