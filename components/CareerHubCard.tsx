type CareerHubCardProps = {
  href?: string;
  kicker: string;
  title: string;
  meta: string;
};

export function CareerHubCard({
  href,
  kicker,
  title,
  meta,
}: CareerHubCardProps) {
  if (!href) {
    return (
      <span className="career-hub-card is-upcoming" aria-disabled="true">
        <span className="career-hub-card-kicker">{kicker}</span>
        <p className="career-hub-card-title">{title}</p>
        <p className="career-hub-card-meta">{meta}</p>
      </span>
    );
  }
  return (
    <a className="career-hub-card" href={href}>
      <span className="career-hub-card-kicker">{kicker}</span>
      <p className="career-hub-card-title">{title}</p>
      <p className="career-hub-card-meta">{meta}</p>
    </a>
  );
}
