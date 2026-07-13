import { Helmet } from 'react-helmet-async';

import { Spa18SubCareerDetailsPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Chi tiết nghề nghiệp</title>
      </Helmet>
      <Spa18SubCareerDetailsPageView />
    </>
  );
}
