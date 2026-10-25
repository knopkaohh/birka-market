const partners = [
  { name: "Cocos", src: "/images/partners/cocos.png" },
  { name: "МТС", src: "/images/partners/mts.svg" },
  { name: "Kudo Wear", src: "/images/partners/kudo.png" },
  { name: "X5", src: "/images/partners/x5.svg" },
  { name: "Lemana Pro", src: "/images/partners/lemana.svg" },
  { name: "Sonox", src: "/images/partners/sonox.png" },
  { name: "Votex", src: "/images/partners/votex.svg" },
  { name: "АФК Система", src: "/images/partners/logo-dark.png" },
];

/** Бегущая строка партнёров; на узком экране та же лента становится сеткой. */
export function PartnersMarquee() {
  const loop = [...partners, ...partners];
  return (
    <section className="partners" aria-label="Наши партнёры">
      <p>
        Наши <em>партнёры</em>
      </p>
      <div className="partner-marquee">
        <div className="partner-track">
          {loop.map((item, index) => (
            <article className="partner-card" key={`${item.name}-${index}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.name} />
            </article>
          ))}
        </div>
      </div>
      <div className="partner-grid">
        {partners.map((item) => (
          <article className="partner-card" key={item.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.name} />
          </article>
        ))}
      </div>
    </section>
  );
}
