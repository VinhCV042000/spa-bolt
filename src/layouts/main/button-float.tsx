// ----------------------------------------------------------------------
// GLOBAL WIDGETS
// ----------------------------------------------------------------------
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { Fab, Zoom, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

import { spa2Services, SPA2_PAGE_IMAGES } from 'src/sections/spa2/spa2-pages-data';

export const SPA2_TEAL = '#2E8B7A';
export const SPA2_TEAL_LIGHT = '#5AB5A3';
export const SPA2_TEAL_DARK = '#1D6B5C';
export const SPA2_CREAM = '#F9F6F1';
export const SPA2_SAGE = '#A8C5B8';
export const SPA2_WARM = '#E8DDD3';
export const SPA2_INK = '#1F2A28';

function Spa2FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Xin chào! Mình là trợ lý ảo Nature Spa, bạn cần tư vấn gì ạ?' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: input },
      {
        from: 'bot',
        text: 'Cảm ơn bạn! Đội ngũ tư vấn sẽ phản hồi sớm nhất, hoặc gọi hotline 1900 6789 để được hỗ trợ ngay.',
      },
    ]);
    setInput('');
  };

  return (
    <>
      {/* Floating buttons */}
      <Stack spacing={1.5} sx={{ position: 'fixed', right: 20, bottom: 90, zIndex: 1300 }}>
        <Zoom in>
          <Fab
            href="https://zalo.me/0909868868"
            target="_blank"
            sx={{ bgcolor: '#0068FF', color: 'white', '&:hover': { bgcolor: '#0055D4' } }}
          >
            <Iconify icon="ic:baseline-chat" width={26} />
          </Fab>
        </Zoom>
        <Zoom in style={{ transitionDelay: '80ms' }}>
          <Fab
            href="tel:19006789"
            sx={{ bgcolor: SPA2_TEAL, color: 'white', '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            <Iconify icon="solar:phone-bold" width={24} />
          </Fab>
        </Zoom>
        <Zoom in style={{ transitionDelay: '160ms' }}>
          <Fab
            onClick={() => setAiOpen(true)}
            sx={{ bgcolor: SPA2_INK, color: 'white', '&:hover': { bgcolor: '#000' } }}
          >
            <Iconify icon="solar:scanner-bold" width={24} />
          </Fab>
        </Zoom>
        <Zoom in style={{ transitionDelay: '240ms' }}>
          <Fab
            onClick={() => setChatOpen(true)}
            sx={{ bgcolor: SPA2_TEAL_LIGHT, color: 'white', '&:hover': { bgcolor: SPA2_TEAL } }}
          >
            <Iconify icon="solar:chat-round-dots-bold" width={24} />
          </Fab>
        </Zoom>
      </Stack>

      {/* Chatbot tư vấn */}
      <Dialog
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        PaperProps={{
          sx: {
            position: 'fixed',
            right: 20,
            bottom: 20,
            m: 0,
            width: 360,
            maxWidth: '90vw',
            borderRadius: 4,
          },
        }}
        hideBackdrop
      >
        <Box
          sx={{
            bgcolor: SPA2_TEAL,
            color: 'white',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>Trợ lý Nature Spa</Typography>
          <IconButton size="small" onClick={() => setChatOpen(false)} sx={{ color: 'white' }}>
            <Iconify icon="solar:close-circle-bold" />
          </IconButton>
        </Box>
        <Stack spacing={1.5} sx={{ p: 2, height: 320, overflowY: 'auto', bgcolor: SPA2_CREAM }}>
          {messages.map((m, idx) => (
            <Box
              key={idx}
              sx={{
                alignSelf: m.from === 'bot' ? 'flex-start' : 'flex-end',
                bgcolor: m.from === 'bot' ? 'common.white' : SPA2_TEAL,
                color: m.from === 'bot' ? SPA2_INK : 'white',
                px: 2,
                py: 1,
                borderRadius: 3,
                maxWidth: '80%',
                fontSize: 14,
              }}
            >
              {m.text}
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ p: 1.5 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Nhập tin nhắn..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <IconButton
            onClick={sendMessage}
            sx={{ bgcolor: SPA2_TEAL, color: 'white', '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            <Iconify icon="solar:plain-2-bold" />
          </IconButton>
        </Stack>
      </Dialog>

      {/* AI Skin Check (nâng cao) */}
      <Dialog open={aiOpen} onClose={() => setAiOpen(false)} maxWidth="xs" fullWidth>
        <Spa2AiSkinCheck onClose={() => setAiOpen(false)} />
      </Dialog>
    </>
  );
}

function Spa2AiSkinCheck({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setStep('analyzing');
    setTimeout(() => setStep('result'), 2200);
  };

  const mockResult = {
    skinType: 'Da hỗn hợp',
    concerns: ['Lỗ chân lông to', 'Thâm nhẹ', 'Thiếu ẩm'],
    recommend: spa2Services.find((s: any) => s.category === 'facial') ?? spa2Services[1],
  };

  return (
    <DialogContent sx={{ p: 4, position: 'relative' }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 12, right: 12 }}>
        <Iconify icon="solar:close-circle-bold" />
      </IconButton>
      <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <Iconify icon="solar:scanner-bold" width={40} sx={{ color: SPA2_TEAL }} />
        <Typography variant="h6" sx={{ color: SPA2_INK }}>
          AI Soi Da
        </Typography>
        <Typography sx={{ fontSize: 13, color: 'text.secondary', textAlign: 'center' }}>
          Tải ảnh khuôn mặt để nhận gợi ý chăm sóc phù hợp (chỉ mang tính tham khảo).
        </Typography>
      </Stack>

      {step === 'upload' && (
        <Button
          fullWidth
          component="label"
          sx={{
            borderRadius: 3,
            border: `1.5px dashed ${SPA2_TEAL}`,
            color: SPA2_TEAL_DARK,
            py: 4,
            flexDirection: 'column',
          }}
        >
          <Iconify icon="solar:camera-bold" width={32} sx={{ mb: 1 }} />
          Tải ảnh lên
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
        </Button>
      )}

      {step === 'analyzing' && (
        <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
          {preview && (
            <Box
              component="img"
              src={preview}
              sx={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
            />
          )}
          <Typography sx={{ color: SPA2_TEAL_DARK }}>Đang phân tích da...</Typography>
        </Stack>
      )}

      {step === 'result' && (
        <Stack spacing={2}>
          {preview && (
            <Box
              component="img"
              src={preview}
              sx={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover', mx: 'auto' }}
            />
          )}
          <Alert severity="info" sx={{ bgcolor: SPA2_CREAM, color: SPA2_INK }}>
            Kết quả chỉ mang tính tham khảo, không thay thế chẩn đoán chuyên môn.
          </Alert>
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ color: 'text.secondary' }}>Loại da</Typography>
            <Typography sx={{ fontWeight: 600, color: SPA2_INK }}>{mockResult.skinType}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {mockResult.concerns.map((c) => (
              <Chip
                key={c}
                size="small"
                label={c}
                sx={{ bgcolor: SPA2_CREAM, color: SPA2_TEAL_DARK }}
              />
            ))}
          </Stack>
          <Divider />
          <Typography sx={{ fontSize: 14, color: 'text.secondary' }}>Gợi ý liệu trình:</Typography>
          <Typography sx={{ fontWeight: 600, color: SPA2_TEAL_DARK }}>
            {mockResult.recommend.name}
          </Typography>
          <Button
            fullWidth
            component={RouterLink}
            href={paths.spa2.serviceDetails(mockResult.recommend.slug)}
            sx={{
              borderRadius: 999,
              bgcolor: SPA2_TEAL,
              color: 'white',
              '&:hover': { bgcolor: SPA2_TEAL_DARK },
            }}
          >
            Xem & đặt lịch
          </Button>
        </Stack>
      )}
    </DialogContent>
  );
}

function Spa2PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 160,
            backgroundImage: `url(${SPA2_PAGE_IMAGES.offers})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <IconButton
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)' }}
          size="small"
        >
          <Iconify icon="solar:close-circle-bold" />
        </IconButton>
      </Box>
      <DialogContent sx={{ textAlign: 'center', p: 3 }}>
        <Chip label="ƯU ĐÃI HÔM NAY" sx={{ bgcolor: SPA2_TEAL, color: 'white', mb: 2 }} />
        <Typography variant="h5" sx={{ color: SPA2_INK, mb: 1 }}>
          Giảm 30% cho khách mới
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 3 }}>
          Áp dụng cho liệu trình đầu tiên. Nhập mã <b>NEW30</b> khi đặt lịch.
        </Typography>
        <Button
          fullWidth
          component={RouterLink}
          href={paths.spa2.booking}
          onClick={() => setOpen(false)}
          sx={{
            borderRadius: 999,
            py: 1.2,
            bgcolor: SPA2_TEAL,
            color: 'white',
            '&:hover': { bgcolor: SPA2_TEAL_DARK },
          }}
        >
          Đặt lịch ngay
        </Button>
      </DialogContent>
    </Dialog>
  );
}

// Export gộp – gắn 1 lần trong Spa2Layout, ví dụ ngay trước </body> hoặc cuối layout JSX
export function SpaGlobalWidgets() {
  return (
    <>
      <Spa2PromoPopup />
      <Spa2FloatingActions />
    </>
  );
}
