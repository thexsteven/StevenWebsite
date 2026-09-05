import Link from 'next/link';

export default function NotFound() {
  return <div className="prose legal"><p className="meta">Seite nicht gefunden</p><h1>Hier geht es<br />nicht weiter.</h1><p>Vielleicht liegt die Geschichte inzwischen an einem anderen Ort.</p><Link className="text-link" href="/reisen">Reisen entdecken ↗</Link></div>;
}
