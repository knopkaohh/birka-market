"use client";

import { FaultScreen } from "@/components/fault-screen";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <FaultScreen
      code="500"
      title="Тираж"
      titleEm="остановился"
      text="Страница Бирка Маркет не собралась. Обновите её или вернитесь в каталог — заявка и расчёт по-прежнему на месте."
      onRetry={reset}
    />
  );
}
