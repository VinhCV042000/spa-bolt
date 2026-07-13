import { Helmet } from 'react-helmet-async';

import { Spa18SubFeedbackPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Cảm nhận</title>
      </Helmet>
      <Spa18SubFeedbackPageView />
    </>
  );
}
