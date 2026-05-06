type StoryDetailHeaderProps = {
  kicker: string;
  titleId: string;
  title: string;
  meta?: string;
  summary?: React.ReactNode;
  children?: React.ReactNode;
};

export function StoryDetailHeader({
  kicker,
  titleId,
  title,
  meta,
  summary,
  children,
}: StoryDetailHeaderProps) {
  return (
    <header className="story-detail-header">
      <p className="section-kicker">{kicker}</p>
      <h1 id={titleId}>{title}</h1>
      {meta && <p className="story-meta">{meta}</p>}
      {summary && <p className="story-summary">{summary}</p>}
      {children}
    </header>
  );
}
