import { Helmet } from 'react-helmet-async';

import { Spa24View } from 'src/sections/spa24/spa24-view';

export default function Spa24Page() {
  return (
    <>
      <Helmet>
        <title>Maison de Lumière — Luxury Spa Couture Hà Nội</title>
        <meta
          name="description"
          content="Maison de Lumière — biệt thự spa haute-couture: 12 nghi lễ riêng tư, đá quý trị liệu, sommelier hương liệu và phòng VIP private terrace nhìn ra hồ."
        />
      </Helmet>
      <Spa24View />
    </>
  );
}
