import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'favorites-list', renderMode: RenderMode.Server },
  { path: 'shopping-list', renderMode: RenderMode.Server },
  { path: 'contact-us', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server }
];
