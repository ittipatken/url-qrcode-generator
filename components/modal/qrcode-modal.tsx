

import { useEffect, useState } from 'react';

import { Modal } from '@/components/ui/modal';
import QRCode from "react-qr-code";
import { Button } from '../ui/button';

interface QrCodeModalProps {
  link: string;
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  link,
  isOpen,
  onClose
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const onImageDownload = () => {

    const svg = document.getElementById("QRCode");
    if (!svg) {
      console.error("SVG element not found");
      return;
    }
  
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas 2D rendering context not supported");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  
  
  return (
    <Modal
      title='Your QR code'
      description='Click download to get the PNG file'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='pt-3 space-y-4 flex flex-col items-center justify-end w-full'>
        <QRCode id="QRCode" value={link} />
        <Button variant="outline" onClick={onImageDownload}>Download</Button>
      </div>
    </Modal>
  );
};
