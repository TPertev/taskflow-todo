/**
 * LocalStorage için güvenli, genel amaçlı yardımcı modül.
 * Tüm okuma/yazma işlemleri try/catch ile korunur; gizli pencere veya
 * kota hatası gibi durumlarda uygulama çökmez.
 */

export function readJSON(key, fallback = null) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.warn(`[storage] "${key}" okunamadı:`, error);
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[storage] "${key}" yazılamadı:`, error);
    return false;
  }
}

export function removeItem(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[storage] "${key}" silinemedi:`, error);
  }
}
