import { Helmet } from 'react-helmet-async';

import { Spa3CareersPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Tuyển dụng</title>
      </Helmet>
      <Spa3CareersPageView />
    </>
  );
}
