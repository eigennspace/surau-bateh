// Error domain bertipe supaya route handler bisa memetakan ke status HTTP
// yang tepat tanpa menebak dari isi pesan.
export class AbsenError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'AbsenError';
    this.code = code;
  }
}

export function notFound(message) {
  return new AbsenError('NOT_FOUND', message);
}

export function invalid(message) {
  return new AbsenError('INVALID', message);
}

export function unauthorized(message) {
  return new AbsenError('UNAUTHORIZED', message);
}
