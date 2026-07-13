import { Helmet } from 'react-helmet-async';

import { Spa7SubServiceDetailsPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Chi tiết dịch vụ</title>
      </Helmet>
      <Spa7SubServiceDetailsPageView />
    </>
  );
}
