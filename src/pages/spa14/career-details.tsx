import { Helmet } from 'react-helmet-async';

import { Spa14SubCareerDetailsPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Chi tiết nghề nghiệp</title>
      </Helmet>
      <Spa14SubCareerDetailsPageView />
    </>
  );
}
