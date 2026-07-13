import { Helmet } from 'react-helmet-async';

import { Spa16SubCareerDetailsPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Chi tiết nghề nghiệp</title>
      </Helmet>
      <Spa16SubCareerDetailsPageView />
    </>
  );
}
