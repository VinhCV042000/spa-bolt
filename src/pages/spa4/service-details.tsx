import { Helmet } from 'react-helmet-async';

import { Spa4ServiceDetailsPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa4ServiceDetailsPageView />
    </>
  );
}
