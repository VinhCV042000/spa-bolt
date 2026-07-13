import { Helmet } from 'react-helmet-async';

import { Spa14SubFeedbackPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Cảm nhận</title>
      </Helmet>
      <Spa14SubFeedbackPageView />
    </>
  );
}
