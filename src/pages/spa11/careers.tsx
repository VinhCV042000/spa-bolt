import { Helmet } from 'react-helmet-async';

import { Spa11SubCareersPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Tuyển dụng</title>
      </Helmet>
      <Spa11SubCareersPageView />
    </>
  );
}
