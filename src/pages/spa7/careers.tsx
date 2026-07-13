import { Helmet } from 'react-helmet-async';

import { Spa7SubCareersPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Tuyển dụng</title>
      </Helmet>
      <Spa7SubCareersPageView />
    </>
  );
}
