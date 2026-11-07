/**
 * Editorial section heading: large serif title on the left, a short
 * introduction aligned to its baseline on the right.
 */
export default function SectionHeading({ id, title, intro, children, tone = 'dark', className = '' }) {
  const introColor = tone === 'light' ? 'text-ivory/75' : 'text-ink';
  return (
    <div
      className={`grid gap-6 border-b pb-10 md:grid-cols-12 md:items-end md:gap-10 lg:pb-14 ${
        tone === 'light' ? 'border-ivory/20' : 'border-charcoal/15'
      } ${className}`}
    >
      <h2 id={id} className="type-h2 max-w-[14ch] md:col-span-7">
        {title}
      </h2>
      <div className="md:col-span-5 md:justify-self-end">
        {intro && <p className={`max-w-[42ch] text-[15px] leading-[1.7] ${introColor}`}>{intro}</p>}
        {children}
      </div>
    </div>
  );
}
