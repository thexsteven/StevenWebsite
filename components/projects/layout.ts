/**
 * Layout-Konstanten der Projekte-Sektion.
 *
 * Grid und Kartenrahmen liegen hier zentral, damit Skeleton und echte
 * Karte exakt dieselben Maße belegen – sonst springt das Layout beim
 * Austausch (CLS).
 */

/**
 * 1 Spalte mobil, 2 ab `md`, 3 ab `xl`.
 *
 * `grid-flow-row-dense` füllt die Lücken, die zweispaltige
 * Featured-Karten sonst am Zeilenende hinterlassen. Dabei rückt
 * höchstens eine spätere einspaltige Karte nach vorne – für ein Raster
 * unabhängiger Projekte ist diese Abweichung von der DOM-Reihenfolge
 * vertretbar, die Tab-Reihenfolge bleibt die der Datendateien.
 */
export const PROJECT_GRID_CLASSNAME =
  'grid grid-flow-row-dense grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3';

/** Featured-Projekte spannen sich über zwei Spalten. */
export const FEATURED_SPAN_CLASSNAME = 'md:col-span-2';

/** Gemeinsamer Rahmen von Karte und Skeleton. */
export const CARD_SHELL_CLASSNAME =
  'flex h-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface';

/** Ruhezustand des Kartenschattens – entspricht `--shadow-sm`. */
export const CARD_SHADOW_CLASSNAME = 'shadow-[var(--shadow-sm)]';

/**
 * Weicherer, größerer Schatten beim Hover/Fokus. Gleiche Navy-Basis wie
 * `--shadow-sm`, nur mit größerem Radius und Versatz.
 */
export const CARD_SHADOW_HOVER_CLASSNAME =
  'hover:shadow-[0_22px_48px_-24px_rgba(15,47,95,0.55)] focus-within:shadow-[0_22px_48px_-24px_rgba(15,47,95,0.55)]';
