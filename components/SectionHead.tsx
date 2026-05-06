import { cn } from '@/lib/utils';

type SectionHeadProps = {
  kicker?: string;
  kickerClassName?: string;
  titleId?: string;
  title: string;
  intro?: React.ReactNode;
};

export function SectionHead({
  kicker,
  kickerClassName,
  titleId,
  title,
  intro,
}: SectionHeadProps) {
  return (
    <div className="section-head">
      {kicker && (
        <p className={cn('section-kicker', kickerClassName)}>{kicker}</p>
      )}
      <h2 id={titleId}>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
