import { Helmet } from 'react-helmet-async';

import { Spa26View } from 'src/sections/spa26/view';

export default function Spa26Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Serene — Scandinavian Wellness Spa | Meditation & Healing</title>
        <meta
          name="description"
          content="Trải nghiệm wellness spa Bắc Âu với triết lý Hygge, Lagom, Fika. Không gian thiền định, trị liệu thiên nhiên, chữa lành sâu."
        />
      </Helmet>
      <Spa26View />
    </>
  );
}
