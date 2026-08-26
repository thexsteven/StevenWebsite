import { NextResponse, type NextRequest } from 'next/server';

import {
  ARCHIVE_LOGIN_PATH,
  ARCHIVE_PATH,
  REDIRECT_PARAM,
  SESSION_COOKIE_NAME,
  hasValidSession,
} from '@/lib/travelAuth';

/**
 * Torwächter für die passwortgeschützte Reise-Galerie.
 *
 * Läuft vor jedem Request auf `/reisen/archiv*` und lässt nur durch, wer ein
 * gültiges Session-Cookie mitbringt. Der Login selbst ist ausgenommen, sonst
 * gäbe es eine Weiterleitungsschleife.
 *
 * Die Middleware ist die erste, nicht die einzige Prüfung: die Seite selbst
 * verifiziert die Session noch einmal (`requireArchiveSession`). Ein Vertipper
 * im `matcher` unten würde sonst die ganze Galerie öffnen.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value ?? null;
  const authenticated = await hasValidSession(token);

  if (pathname === ARCHIVE_LOGIN_PATH) {
    // Wer schon eingeloggt ist, braucht das Formular nicht mehr.
    if (authenticated) {
      return NextResponse.redirect(new URL(ARCHIVE_PATH, request.url));
    }
    return NextResponse.next();
  }

  if (authenticated) return NextResponse.next();

  const loginUrl = new URL(ARCHIVE_LOGIN_PATH, request.url);
  if (pathname !== ARCHIVE_PATH) {
    loginUrl.searchParams.set(REDIRECT_PARAM, pathname);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/reisen/archiv', '/reisen/archiv/:path*'],
};
