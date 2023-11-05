export function zodErrorsParse(error) {
  return error.errors.map((err) => err.message);
}
