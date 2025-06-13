export function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function getStatusClass(status) {
  const base = 'text-xs font-medium px-2 py-1 rounded';
  const classes = {
    pending: `${base} bg-yellow-100 text-yellow-800`,
    approved: `${base} bg-blue-100 text-blue-800`,
    shipped: `${base} bg-purple-100 text-purple-800`,
    delivered: `${base} bg-green-100 text-green-800`,
    cancelled: `${base} bg-red-100 text-red-800`
  };
  return classes[status] || `${base} bg-gray-100 text-gray-800`;
}
