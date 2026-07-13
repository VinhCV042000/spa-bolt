import { Helmet } from 'react-helmet-async';

import { Spa6View } from 'src/sections/spa6/view';

// ----------------------------------------------------------------------

export default function Spa6Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal — Wellness & Holistic Healing</title>
        <meta
          name="description"
          content="Terra Heal — Hành trình wellness Ayurveda & Bali với liệu pháp từ thiên nhiên: Abhyanga, Forest Bathing, Boreh Bali và Herbal Steam."
        />
      </Helmet>

      <Spa6View />
    </>
  );
}