import { Helmet } from 'react-helmet-async';

import { Spa3CareerDetailsPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Chi tiết nghề nghiệp</title>
      </Helmet>
      <Spa3CareerDetailsPageView />
    </>
  );
}
