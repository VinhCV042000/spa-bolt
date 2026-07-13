import { Helmet } from 'react-helmet-async';

import { Spa21View } from 'src/sections/spa21/view';

export default function Spa21Page() {
  return (
    <>
      <Helmet>
        <title>MediSpa — Clinical Luxury Aesthetic & Laser Treatments</title>
        <meta
          name="description"
          content="MediSpa chuẩn y khoa: laser, HIFU, filler, PRP. Công nghệ FDA approved, bác sĩ chuyên khoa, không gian clinical luxury."
        />
      </Helmet>
      <Spa21View />
    </>
  );
}
