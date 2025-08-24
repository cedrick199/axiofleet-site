// src/lib/validators/forms.js
/**
 * validateRequired({ nom: 'x', email: '', subject: 'x', consent: true })
 * -> { email: 'Champ requis' }
 */
export function validateRequired(fields) {
  const errors = {};
  Object.entries(fields).forEach(([key, val]) => {
    const isChecked = typeof val === 'boolean' ? val : String(val || '').trim().length > 0;
    if (!isChecked) errors[key] = 'Champ requis';
  });
  return errors;
}

export default { validateRequired };
