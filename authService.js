import { db } from '../core/supabase.js';
import { AppState } from '../core/state.js';

export async function executeSignUp() {
  console.log("Sign up executed");
}

export async function executeSignIn() {
  console.log("Sign in executed");
}

export async function executeConfirmedSignOut() {
  await db.auth.signOut();
  window.location.reload();
}
