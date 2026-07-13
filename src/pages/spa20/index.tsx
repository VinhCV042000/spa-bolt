import { Helmet } from 'react-helmet-async';

import { Spa20View } from 'src/sections/spa20/view';

export default function Spa20Page() {
  return (
    <>
      <Helmet>
        <title>Glow Beauty Spa — Premium Aesthetic & Skincare Treatments</title>
        <meta
          name="description"
          content="Trị liệu thẩm mỹ cao cấp: laser, HIFU, filler, PRP. Công nghệ hiện đại kết hợp nghệ thuật làm đẹp, tôn vinh nét đẹp riêng biệt của bạn."
        />
      </Helmet>
      <Spa20View />
    </>
  );
}
