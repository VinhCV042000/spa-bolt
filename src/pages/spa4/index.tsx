import { Helmet } from 'react-helmet-async';

import { Spa4View } from 'src/sections/spa4/view';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Jade Blossom Wellness - Vẻ đẹp thuần khiết từ thiên nhiên Á Đông',
  description:
    'Jade Blossom Wellness - Spa K-Beauty & Nhật Bản cao cấp. Trải nghiệm Jade Stone Massage, K-Beauty Glow Ritual, Sakura Body Wrap độc quyền. Đặt lịch ngay!',
};

export default function Spa4Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Helmet>

      <Spa4View />
    </>
  );
}