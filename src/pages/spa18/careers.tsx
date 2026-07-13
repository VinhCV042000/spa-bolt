import { Helmet } from 'react-helmet-async';

import { Spa18SubCareersPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Tuyển dụng</title>
      </Helmet>
      <Spa18SubCareersPageView />
    </>
  );
}
