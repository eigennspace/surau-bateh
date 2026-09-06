'use server';

import { getPool } from '../../../lib/db.js';
import {
  setujuiKehadiranDitinjau,
  tolakKehadiranDitinjau,
  koreksiJamKehadiran,
} from '../../../lib/absen/index.js';

export async function setujuiKehadiranAction(kehadiranId) {
  await setujuiKehadiranDitinjau(getPool(), kehadiranId);
}

export async function tolakKehadiranAction(kehadiranId) {
  await tolakKehadiranDitinjau(getPool(), kehadiranId);
}

export async function koreksiKehadiranAction(kehadiranId, { jamMasuk, jamPulang }) {
  await koreksiJamKehadiran(getPool(), kehadiranId, {
    jamMasuk: jamMasuk ? new Date(jamMasuk) : null,
    jamPulang: jamPulang ? new Date(jamPulang) : null,
  });
}
