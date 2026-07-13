import { Helmet } from 'react-helmet-async';

import { Spa16View } from 'src/sections/spa16/view';

export default function Spa16Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus — Moroccan Hammam & Argan Spa</title>
        <meta
          name="description"
          content="Riad Al-Andalus — Hammam Maroc giữa Hội An: bốn phòng hơi đá cẩm thạch, sáu nghi lễ argan & rhassoul, riad mái vòm zellige và trà bạc hà Berber."
        />
      </Helmet>
      <Spa16View />
    </>
  );
}
