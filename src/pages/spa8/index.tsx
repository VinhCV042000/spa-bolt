import { Helmet } from 'react-helmet-async';

import { Spa8View } from 'src/sections/spa8/view';

// ----------------------------------------------------------------------

export default function Spa8Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen あまや温泉 — Japanese Ryokan Wellness Retreat</title>
        <meta
          name="description"
          content="Amaya Onsen — Trải nghiệm linh hồn Ryokan Nhật Bản với onsen khoáng nóng, shiatsu cổ điển và liệu trình theo 4 mùa. 'Ma' — khoảng lặng thiêng liêng."
        />
      </Helmet>
      <Spa8View />
    </>
  );
}
