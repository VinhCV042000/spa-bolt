import { Helmet } from 'react-helmet-async';

import { Spa17SubCareerDetailsPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Chi tiết nghề nghiệp</title>
      </Helmet>
      <Spa17SubCareerDetailsPageView />
    </>
  );
}
