export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-AR');
}
