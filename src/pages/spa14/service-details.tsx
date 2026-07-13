import { Helmet } from 'react-helmet-async';

import { Spa14SubServiceDetailsPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa14SubServiceDetailsPageView />
    </>
  );
}
