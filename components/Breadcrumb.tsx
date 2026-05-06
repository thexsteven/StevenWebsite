type BreadcrumbProps = {
  href: string;
  label: string;
};

export function Breadcrumb({ href, label }: BreadcrumbProps) {
  return (
    <div className="breadcrumb">
      <a href={href}>{label}</a>
    </div>
  );
}
