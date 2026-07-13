import { Helmet } from 'react-helmet-async';

import { Spa12View } from 'src/sections/spa12/view';

export default function Spa12Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Luminary — Ultra-Luxury Beauty Sanctuary</title>
        <meta
          name="description"
          content="Pearl Luminary — Thánh địa làm đẹp xa xỉ tuyệt đỉnh: bột ngọc trai Nhật Bản, 24K gold facial, kim cương microdermabrasion và liệu pháp tế bào gốc. By appointment only."
        />
      </Helmet>
      <Spa12View />
    </>
  );
}
