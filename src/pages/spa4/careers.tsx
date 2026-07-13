import { Helmet } from 'react-helmet-async';

import { Spa4CareersPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Tuyển dụng</title>
      </Helmet>
      <Spa4CareersPageView />
    </>
  );
}
