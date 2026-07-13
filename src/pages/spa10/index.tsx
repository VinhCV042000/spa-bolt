import { Helmet } from 'react-helmet-async';

import { Spa10View } from 'src/sections/spa10/view';

export default function Spa10Page() {
  return (
    <>
      <Helmet>
        <title>Aurora Nordic Spa — Scandinavian Forest Wellness Rituals</title>
        <meta
          name="description"
          content="Aurora Nordic Spa — Nghi lễ Nordic cổ truyền: sauna bạch dương 80°C, cold plunge 4°C và tắm rừng Friluftsliv. Trải nghiệm Bắc Âu đích thực."
        />
      </Helmet>
      <Spa10View />
    </>
  );
}
