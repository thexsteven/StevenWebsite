import { describe, expect, it } from 'vitest';

import {
  formatDateRange,
  sortNewestFirst,
  toTravelEntry,
  type TravelEntry,
} from '@/lib/travelArchive';
import { getTravelEntries } from '@/lib/travelArchive.server';

function entry(overrides: Partial<TravelEntry> = {}): TravelEntry {
  return {
    id: 'test',
    title: 'Test',
    country: '',
    startDate: '2025-01-01',
    endDate: '2025-01-01',
    description: '',
    coverImage: null,
    images: [],
    ...overrides,
  };
}

describe('toTravelEntry', () => {
  const gueltig = { title: 'Hawaii', startDate: '2025-03-02' };

  it('übernimmt die gesetzten Felder', () => {
    const result = toTravelEntry(
      {
        id: 'hawaii',
        title: 'Hawaii',
        country: 'USA',
        startDate: '2025-03-02',
        endDate: '2025-04-14',
        description: 'Sprachreise',
        coverImage: 'https://example.test/cover.jpg',
        images: ['https://example.test/a.jpg'],
      },
      'dateiname',
    );

    expect(result).toMatchObject({
      id: 'hawaii',
      title: 'Hawaii',
      country: 'USA',
      startDate: '2025-03-02',
      endDate: '2025-04-14',
      description: 'Sprachreise',
      coverImage: 'https://example.test/cover.jpg',
    });
  });

  it('nimmt den Dateinamen als id, wenn keine gesetzt ist', () => {
    expect(toTravelEntry(gueltig, 'dateiname')?.id).toBe('dateiname');
  });

  it('überspringt Einträge ohne Titel', () => {
    expect(toTravelEntry({ startDate: '2025-03-02' }, 'x')).toBeNull();
    expect(toTravelEntry({ title: '   ', startDate: '2025-03-02' }, 'x')).toBe(
      null,
    );
  });

  it('überspringt Einträge ohne gültiges Startdatum', () => {
    expect(toTravelEntry({ title: 'X' }, 'x')).toBeNull();
    expect(toTravelEntry({ title: 'X', startDate: '02.03.2025' }, 'x')).toBe(
      null,
    );
    expect(toTravelEntry({ title: 'X', startDate: '2025-3-2' }, 'x')).toBeNull();
    // Rolldatum: `new Date` würde daraus still den 03.03. machen.
    expect(toTravelEntry({ title: 'X', startDate: '2025-02-31' }, 'x')).toBe(
      null,
    );
  });

  it('setzt endDate auf startDate, wenn keins oder ein kaputtes dasteht', () => {
    expect(toTravelEntry(gueltig, 'x')?.endDate).toBe('2025-03-02');
    expect(
      toTravelEntry({ ...gueltig, endDate: 'quatsch' }, 'x')?.endDate,
    ).toBe('2025-03-02');
  });

  it('korrigiert ein Enddatum, das vor dem Start liegt', () => {
    expect(
      toTravelEntry({ ...gueltig, endDate: '2024-01-01' }, 'x')?.endDate,
    ).toBe('2025-03-02');
  });

  it('versteht Bilder als Kurzform und als Objekt', () => {
    const result = toTravelEntry(
      {
        ...gueltig,
        images: [
          'https://example.test/a.jpg',
          { src: 'https://example.test/b.jpg', alt: 'Eigener Text' },
        ],
      },
      'x',
    );

    expect(result?.images).toEqual([
      // Ohne eigenen Alt-Text erbt das Bild den Reisetitel.
      { src: 'https://example.test/a.jpg', alt: 'Hawaii' },
      { src: 'https://example.test/b.jpg', alt: 'Eigener Text' },
    ]);
  });

  it('wirft kaputte Bild-Einträge weg, statt an ihnen zu scheitern', () => {
    const result = toTravelEntry(
      {
        ...gueltig,
        images: [
          '',
          null,
          42,
          { alt: 'ohne src' },
          'https://example.test/gut.jpg',
        ],
      },
      'x',
    );

    expect(result?.images).toEqual([
      { src: 'https://example.test/gut.jpg', alt: 'Hawaii' },
    ]);
  });

  it('nimmt das erste Bild als Cover, wenn keins gesetzt ist', () => {
    const result = toTravelEntry(
      { ...gueltig, images: ['https://example.test/a.jpg'] },
      'x',
    );
    expect(result?.coverImage).toBe('https://example.test/a.jpg');
  });

  it('kommt ohne Bilder aus', () => {
    const result = toTravelEntry(gueltig, 'x');
    expect(result?.images).toEqual([]);
    expect(result?.coverImage).toBeNull();
  });
});

describe('sortNewestFirst', () => {
  it('stellt die neueste Reise nach vorn', () => {
    const sorted = sortNewestFirst([
      entry({ id: 'alt', startDate: '2021-09-11' }),
      entry({ id: 'neu', startDate: '2025-06-21' }),
      entry({ id: 'mitte', startDate: '2024-08-05' }),
    ]);

    expect(sorted.map((item) => item.id)).toEqual(['neu', 'mitte', 'alt']);
  });

  it('entscheidet bei gleichem Datum stabil über die id', () => {
    // Sonst hinge die Reihenfolge daran, wie das Dateisystem das Verzeichnis
    // ausliest – und wäre zwischen lokal und Vercel womöglich verschieden.
    const sorted = sortNewestFirst([
      entry({ id: 'b', startDate: '2025-06-21' }),
      entry({ id: 'a', startDate: '2025-06-21' }),
    ]);

    expect(sorted.map((item) => item.id)).toEqual(['a', 'b']);
  });

  it('lässt die Eingabe unverändert', () => {
    const input = [
      entry({ id: 'alt', startDate: '2021-09-11' }),
      entry({ id: 'neu', startDate: '2025-06-21' }),
    ];
    sortNewestFirst(input);

    expect(input.map((item) => item.id)).toEqual(['alt', 'neu']);
  });
});

describe('formatDateRange', () => {
  it('schreibt ein einzelnes Datum aus', () => {
    expect(formatDateRange('2025-03-02', '2025-03-02')).toBe('02. März 2025');
  });

  it('kürzt innerhalb eines Monats auf einen Monatsnamen', () => {
    expect(formatDateRange('2022-07-09', '2022-07-20')).toBe(
      '09.–20. Juli 2022',
    );
  });

  it('nennt das Jahr nur einmal, solange beide Daten darin liegen', () => {
    expect(formatDateRange('2025-03-02', '2025-04-14')).toBe(
      '02. März – 14. April 2025',
    );
  });

  it('schreibt über den Jahreswechsel beide Seiten voll aus', () => {
    expect(formatDateRange('2024-12-28', '2025-01-03')).toBe(
      '28. Dezember 2024 – 03. Januar 2025',
    );
  });

  it('rechnet unabhängig von der Zeitzone des Servers', () => {
    // Ohne UTC-Verankerung würde ein Server westlich von Greenwich hier den
    // Vortag anzeigen.
    expect(formatDateRange('2025-01-01', '2025-01-01')).toBe(
      '01. Januar 2025',
    );
  });
});

describe('getTravelEntries', () => {
  it('liest die Reisen aus content/reisen', async () => {
    const entries = await getTravelEntries();
    expect(entries.length).toBeGreaterThan(0);
  });

  it('liefert sie neueste zuerst', async () => {
    const entries = await getTravelEntries();
    const dates = entries.map((item) => item.startDate);

    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it('gibt jeder Reise die Pflichtfelder mit', async () => {
    for (const item of await getTravelEntries()) {
      expect(item.id).not.toBe('');
      expect(item.title).not.toBe('');
      expect(item.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.endDate >= item.startDate).toBe(true);
    }
  });

  it('gibt jedem Bild eine Quelle und einen Alt-Text', async () => {
    for (const item of await getTravelEntries()) {
      for (const image of item.images) {
        expect(image.src).not.toBe('');
        expect(image.alt).not.toBe('');
      }
    }
  });

  it('verweist nur auf die freigegebene Cloudinary-Quelle', async () => {
    // next/image lehnt zur Laufzeit alles ab, was nicht als remotePattern in
    // next.config.ts steht – hier fällt das schon im Test auf.
    const erlaubt = /^https:\/\/res\.cloudinary\.com\/dozdjb4fi\//;

    for (const item of await getTravelEntries()) {
      if (item.coverImage !== null) {
        expect(item.coverImage).toMatch(erlaubt);
      }
      for (const image of item.images) {
        expect(image.src).toMatch(erlaubt);
      }
    }
  });
});
