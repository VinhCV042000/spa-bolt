import { Helmet } from 'react-helmet-async';

import { Spa2CareerDetailsPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Chi tiết nghề nghiệp</title>
      </Helmet>
      <Spa2CareerDetailsPageView />
    </>
  );
}
