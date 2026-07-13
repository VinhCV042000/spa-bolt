import { Helmet } from 'react-helmet-async';

import { Spa2CareersPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Tuyển dụng</title>
      </Helmet>
      <Spa2CareersPageView />
    </>
  );
}
