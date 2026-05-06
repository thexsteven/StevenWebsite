type Highlight = {
  label: string;
  value: React.ReactNode;
};

export function StoryHighlights({ items }: { items: Highlight[] }) {
  return (
    <ul className="story-highlights">
      {items.map((item) => (
        <li key={item.label} className="story-highlight">
          <span className="highlight-label">{item.label}</span>
          <span className="highlight-value">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
