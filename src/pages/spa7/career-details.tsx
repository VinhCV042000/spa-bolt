import { Helmet } from 'react-helmet-async';

import { Spa7SubCareerDetailsPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Chi tiết nghề nghiệp</title>
      </Helmet>
      <Spa7SubCareerDetailsPageView />
    </>
  );
}
