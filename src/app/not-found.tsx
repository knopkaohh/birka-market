import type { Metadata } from "next";
import { FaultScreen } from "@/components/fault-screen";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <FaultScreen
      code="404"
      title="Эта бирка"
      titleEm="не пришита"
      text="Страницы с таким адресом в тираже Бирка Маркет нет. Проверьте ссылку или откройте каталог — там все материалы на месте."
    />
  );
}
