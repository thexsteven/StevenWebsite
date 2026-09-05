import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Impressum' };

export default function Impressum() {
  return <article className="prose legal"><h1>Impressum</h1><p>Angaben gemäß § 5 DDG</p><address>Steven Braun<br />Goethestraße 38<br />32469 Petershagen<br />Deutschland<br /><br />E-Mail: <a href="mailto:steven@braun-agents.de">steven@braun-agents.de</a></address></article>;
}
