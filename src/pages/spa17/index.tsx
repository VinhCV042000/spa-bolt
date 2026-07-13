import { Helmet } from 'react-helmet-async';

import { Spa17View } from 'src/sections/spa17/view';

export default function Spa17Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow — Korean Glass Skin Spa & Crystal Therapy</title>
        <meta
          name="description"
          content="Liệu trình Glass Skin Hàn Quốc — 10 bước K-Beauty, Gua Sha đá quý, Jjimjilbang thải detox. Crystal healing với Rose Quartz, Amethyst, Jade."
        />
      </Helmet>
      <Spa17View />
    </>
  );
}
