import { Helmet } from 'react-helmet-async';

import { Spa13FeedbackView } from 'src/sections/spa13/spa13-content-pages';

export default function Spa13FeedbackPage() {
  return (
    <>
      <Helmet>
        <title>Feedback — Amazônia Selvagem Spa</title>
      </Helmet>
      <Spa13FeedbackView />
    </>
  );
}
