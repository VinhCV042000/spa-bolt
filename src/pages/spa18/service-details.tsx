import { Helmet } from 'react-helmet-async';

import { Spa18SubServiceDetailsPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa18SubServiceDetailsPageView />
    </>
  );
}
