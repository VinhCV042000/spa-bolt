import { Helmet } from 'react-helmet-async';

import { Spa19View } from 'src/sections/spa19/view';

export default function Spa19Page() {
  return (
    <>
      <Helmet>
        <title>Dưỡng Sinh Đạo — Vietnamese Traditional Wellness & Qi Gong Spa</title>
        <meta
          name="description"
          content="Khí công, châm cứu, tắm dược thảo Nam, trầm hương thiền — dưỡng sinh theo tinh hoa y học cổ truyền Việt Nam và Á Đông."
        />
      </Helmet>
      <Spa19View />
    </>
  );
}
