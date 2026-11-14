import { AppState } from '../core/state.js';

export function showTab(id, btn) {
  document.querySelectorAll('main > div').forEach(d => d.style.display = 'none');
  const target = document.getElementById(id);
  if (target) target.style.display = 'block';
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

export function isAnyModalOrSubViewOpen() {
  return false;
}

export function applySwipeEntranceAnimation() {}

export function handleSwipeGesture() {}
