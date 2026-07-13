import { Helmet } from 'react-helmet-async';

import { Spa3FeedbackPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Cảm nhận</title>
      </Helmet>
      <Spa3FeedbackPageView />
    </>
  );
}
