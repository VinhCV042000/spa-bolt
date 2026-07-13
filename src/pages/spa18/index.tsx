import { Helmet } from 'react-helmet-async';

import { Spa18View } from 'src/sections/spa18/view';

export default function Spa18Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven — Bali Tropical Spa & Balinese Healing</title>
        <meta
          name="description"
          content="Lulur sữa dừa, Boreh gừng quế,按摩 đá nóng Balinese — thiền giữa vườn nhiệt đới, villa tropical với staff từ Bali."
        />
      </Helmet>
      <Spa18View />
    </>
  );
}
