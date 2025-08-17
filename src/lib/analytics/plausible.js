export function track(event, props={}){ try{ if(window.plausible){ window.plausible(event,{props}) } }catch{} }
