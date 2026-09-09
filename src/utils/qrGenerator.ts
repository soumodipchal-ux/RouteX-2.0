import QRCode from 'qrcode';

export interface QRPassData {
  bookingId: string;
  token: string;
  customerName: string;
  destination: string;
  travelDate: string;
  travellersCount: number;
  status: string;
}

export async function generateQRCodeDataURL(data: QRPassData): Promise<string> {
  // We encode a secure verification payload including token and validation URL
  const payload = JSON.stringify({
    app: 'RouteX',
    bid: data.bookingId,
    token: data.token,
    holder: data.customerName,
    dest: data.destination,
    date: data.travelDate,
    pax: data.travellersCount,
    verifiedUrl: `https://routex.in/verify?token=${data.token}`,
  });

  try {
    const url = await QRCode.toDataURL(payload, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 280,
      color: {
        dark: '#0f382a', // Deep emerald brand tone
        light: '#ffffff',
      },
    });
    return url;
  } catch (err) {
    console.error('QR code generation error:', err);
    // Fallback QR code generator via safe URL if canvas fails
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(payload)}`;
  }
}
