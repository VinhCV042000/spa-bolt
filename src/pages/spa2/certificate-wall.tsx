import { Helmet } from 'react-helmet-async';

import { Spa2CertificateWallPageView } from 'src/sections/spa2/view/spa2-content-pages8';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Bảng chứng nhận</title>
      </Helmet>
      <Spa2CertificateWallPageView />
    </>
  );
}
