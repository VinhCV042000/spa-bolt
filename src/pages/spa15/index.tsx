import { Helmet } from 'react-helmet-async';

import { Spa15View } from 'src/sections/spa15/view';

export default function Spa15Page() {
  return (
    <>
      <Helmet>
        <title>Sakura Onsen Ryokan — Wabi-Sabi Wellness</title>
        <meta
          name="description"
          content="Sakura Onsen Ryokan — Trải nghiệm onsen khoáng nóng Nhật Bản, shiatsu cổ truyền, kaiseki và phòng tatami giữa cao nguyên."
        />
      </Helmet>
      <Spa15View />
    </>
  );
}
