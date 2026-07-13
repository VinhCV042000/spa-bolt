import { Helmet } from 'react-helmet-async';

import { Spa2ContactPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Liên hệ</title>
      </Helmet>
      <Spa2ContactPageView />
    </>
  );
}
