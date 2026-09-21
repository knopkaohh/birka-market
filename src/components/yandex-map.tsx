import { company } from "@/lib/site";

type YandexMapProps = {
  height?: number;
  compact?: boolean;
};

export function YandexMap({ height = 600, compact = false }: YandexMapProps) {
  return (
    <section className={`map-section ${compact ? "is-compact" : ""}`} aria-label="Офис на карте">
      {!compact && (
        <div className="map-heading">
          <div>
            <span className="section-number light">07 / КАК НАС НАЙТИ</span>
            <h2>
              Офис и склад
              <br />
              в Москве
            </h2>
          </div>
          <div className="map-meta">
            <p>{company.address}</p>
            <p>{company.hours}</p>
            <a href={company.map.route} target="_blank" rel="noreferrer">
              Открыть в Яндекс Картах
            </a>
          </div>
        </div>
      )}
      <div className="map-frame" style={{ height }}>
        <iframe
          title={`${company.map.title}: ${company.map.description}`}
          src={company.map.widget}
          width="100%"
          height={height}
          loading="lazy"
          allowFullScreen
        />
      </div>
      <div className="map-badge">
        <iframe
          title="Рейтинг Бирка Маркет в Яндекс Справочнике"
          src={company.map.sprav}
          width="150"
          height="50"
          loading="lazy"
        />
        {compact && (
          <a href={company.map.route} target="_blank" rel="noreferrer">
            Проложить маршрут
          </a>
        )}
      </div>
    </section>
  );
}
