import { Helmet } from 'react-helmet-async';

import { Spa11View } from 'src/sections/spa11/view';

export default function Spa11Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech — Authentic Moroccan Hammam Experience</title>
        <meta
          name="description"
          content="Hammam Marrakech — Nghi lễ Hammam Morocco cổ điển: xà phòng Beldi, kessa, đất sét rhassoul và dầu argan Agadir. 5000 năm truyền thống chữa lành."
        />
      </Helmet>
      <Spa11View />
    </>
  );
}
