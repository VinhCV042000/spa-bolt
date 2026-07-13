import { Helmet } from 'react-helmet-async';

import { Spa11SubCareerDetailsPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Chi tiết nghề nghiệp</title>
      </Helmet>
      <Spa11SubCareerDetailsPageView />
    </>
  );
}
