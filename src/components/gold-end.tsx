/** Последнее слово заголовка — золотым курсивом, как на главной. */
export function GoldEnd({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  if (words.length < 2) return text;
  const end = words.pop();
  return (
    <>
      {words.join(" ")} <em>{end}</em>
    </>
  );
}
