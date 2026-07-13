import { Helmet } from 'react-helmet-async';

import { Spa23View } from 'src/sections/spa23/spa23-view';

export default function Spa23Page() {
  return (
    <>
      <Helmet>
        <title>Maison Florale — Atelier Spa Pháp giữa Sài Gòn</title>
        <meta
          name="description"
          content="Maison Florale — atelier spa boutique Pháp với 4 nghi lễ hoa tươi, 6 khu vườn nguyên liệu organic và bữa trà Paris mỗi chiều giữa lòng Sài Gòn."
        />
      </Helmet>
      <Spa23View />
    </>
  );
}
