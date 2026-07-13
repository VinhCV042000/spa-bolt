import { Helmet } from 'react-helmet-async';

import { Spa3ServicesPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Dịch vụ</title>
      </Helmet>
      <Spa3ServicesPageView />
    </>
  );
}
