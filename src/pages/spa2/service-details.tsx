import { Helmet } from 'react-helmet-async';

import { Spa2ServiceDetailsPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa2ServiceDetailsPageView />
    </>
  );
}
