import { db } from './core/supabase.js';
import { AppState } from './core/state.js';

import * as AuthService from './services/authService.js';
import * as ProfileService from './services/profileService.js';
import * as PostService from './services/postService.js';
import * as StoryService from './services/storyService.js';
import * as ChatService from './services/chatService.js';
import * as NotifService from './services/notificationService.js';

import * as ImageUtils from './utils/imageUtils.js';
import * as DateUtils from './utils/dateUtils.js';
import * as DomUtils from './utils/domUtils.js';
import * as Helpers from './utils/helpers.js';

import * as Navigation from './components/navigation.js';
import * as FeedComponent from './components/feed.js';
import * as StoriesComponent from './components/stories.js';
import * as ChatComponent from './components/chat.js';
import * as ProfileComponent from './components/profile.js';
import * as NotifComponent from './components/notifications.js';
import * as ModalsComponent from './components/modals.js';

window.db = db;
window.AppState = AppState;

const globalBindings = {
  ...AuthService,
  ...ProfileService,
  ...PostService,
  ...StoryService,
  ...ChatService,
  ...NotifService,
  ...ImageUtils,
  ...DateUtils,
  ...DomUtils,
  ...Helpers,
  ...Navigation,
  ...FeedComponent,
  ...StoriesComponent,
  ...ChatComponent,
  ...ProfileComponent,
  ...NotifComponent,
  ...ModalsComponent
};

Object.keys(globalBindings).forEach(fnName => {
  window[fnName] = globalBindings[fnName];
});

(async () => {
  try {
    const { data, error } = await db.auth.getSession();
    if (error) {
      console.warn('Error al obtener sesión inicial:', error.message);
    }

    if (data.session?.user) {
      await ModalsComponent.loadAccount(data.session.user);
    } else {
      ModalsComponent.showAuthOverlay();
    }
    ModalsComponent.hideSplashScreen();
  } catch (err) {
    console.error('Error crítico en la inicialización de ÖG:', err);
    ModalsComponent.hideSplashScreen();
  }
})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
