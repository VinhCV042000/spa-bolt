import { Helmet } from 'react-helmet-async';

import { Spa2ServicesPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Dịch vụ</title>
      </Helmet>
      <Spa2ServicesPageView />
    </>
  );
}
