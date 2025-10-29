export default function DisplayContent({ html }: { html: string }) {
  return (
    <div
      className="border p-4 rounded "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
