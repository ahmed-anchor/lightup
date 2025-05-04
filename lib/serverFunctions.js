



export function validateEntries (formData) {
  const { imageFile, name, password, phone } = Object.fromEntries(formData);
  if( !imageFile || !name || !password || !phone ) return false
  return true
}