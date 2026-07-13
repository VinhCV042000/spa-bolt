import { Helmet } from 'react-helmet-async';

import { Spa14SubCareersPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Tuyển dụng</title>
      </Helmet>
      <Spa14SubCareersPageView />
    </>
  );
}
