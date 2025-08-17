import { FORMS } from "../../config/forms.config"
export function validateRequired(data){
  const missing = FORMS.required.filter(k=>!String(data[k]||"").trim())
  return { valid: missing.length===0, missing }
}
