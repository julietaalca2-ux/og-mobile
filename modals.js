import { db } from '../core/supabase.js';
import { AppState } from '../core/state.js';

export function switchAuthSubView() {}
export function showAuthOverlay() {
  const el = document.getElementById('authWelcomeOverlay');
  if (el) el.style.display = 'flex';
}
export function hideAuthOverlay() {
  const el = document.getElementById('authWelcomeOverlay');
  if (el) el.style.display = 'none';
}
export function hideSplashScreen() {
  const el = document.getElementById('appSplashScreen');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 300);
  }
}
export async function loadAccount(user) {
  AppState.currentUser = user;
  hideAuthOverlay();
  hideSplashScreen();
}
export async function openMenuSection() {}
export async function closeMenuSection() {}
export async function openMenuSubPage() {}
export async function backToMainMenu() {}
export async function saveMenuPreferences() {}
export async function loadMenuPreferences() {}
export async function loadUserOwnActivity() {}
export async function submitHelpReport() {}
export async function populateAccountCenter() {}
export async function updateUserPassword() {}
export async function promptLogoutConfirmation() {}
export async function closeLogoutConfirmation() {}
export async function executeConfirmedSignOut() {}
