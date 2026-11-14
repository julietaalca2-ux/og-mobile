export function status(id, message) {
  console.log(`Status [${id}]: ${message}`);
}

export function createAvatarNode(profile, isStoryActive) {
  const div = document.createElement('div');
  div.className = isStoryActive ? 'story-ring' : '';
  div.innerHTML = `<div class="story-avatar-wrap"><img src="${profile.avatar_url || 'https://via.placeholder.com/150'}" /></div>`;
  return div;
}

export function updateNavAvatarUI() {}
