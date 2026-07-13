import { Helmet } from 'react-helmet-async';

import { Spa11SubServiceDetailsPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa11SubServiceDetailsPageView />
    </>
  );
}
