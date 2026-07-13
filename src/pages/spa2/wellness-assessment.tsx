import { Helmet } from 'react-helmet-async';

import { Spa2WellnessAssessmentPageView } from 'src/sections/spa2/view/spa2-content-pages5';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Wellness Assessment</title>
      </Helmet>
      <Spa2WellnessAssessmentPageView />
    </>
  );
}
