import { Helmet } from 'react-helmet-async';

import { Spa4FeedbackPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Phản hồi</title>
      </Helmet>
      <Spa4FeedbackPageView />
    </>
  );
}
