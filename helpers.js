export function resolveStoryLikeUserId(row) {
  return row.user_id;
}

export function getSavedPostIds() {
  try {
    return JSON.parse(localStorage.getItem('saved_posts') || '[]');
  } catch {
    return [];
  }
}

export function getStoryExpirationISO() {
  const d = new Date();
  d.setHours(d.getHours() - 24);
  return d.toISOString();
}

export function detectStoryMediaType(story) {
  return 'image';
}
