import { Helmet } from 'react-helmet-async';

import { Spa3ServiceDetailsPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa3ServiceDetailsPageView />
    </>
  );
}
