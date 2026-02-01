import { QRCodeSVG } from "qrcode.react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";

interface QRCodeDisplayProps {
  sessionId: string;
  scannedCount: number;
  isBlurred: boolean;
}

const QRCodeDisplay = ({ sessionId, scannedCount, isBlurred }: QRCodeDisplayProps) => {
  const qrUrl = `${window.location.origin}?session=${sessionId}`;

  return (
    <div className="relative flex flex-col items-center gap-6">
      <div className="relative">
        <div
          className={`
            p-6 bg-card rounded-2xl shadow-romantic transition-all duration-500
            ${isBlurred ? 'blur-md opacity-50' : 'animate-pulse-glow'}
          `}
        >
          <QRCodeSVG
            value={qrUrl}
            size={200}
            bgColor="transparent"
            fgColor="hsl(340, 82%, 45%)"
            level="H"
            includeMargin
          />
        </div>


        {/* Center heart overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-card p-2 rounded-full shadow-lg">
            <Heart className="w-8 h-8 text-primary fill-primary animate-heartbeat" />
          </div>
        </div>

        {/* Blurred overlay message */}


        {isBlurred && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-card/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg text-center">
              <Heart className="w-6 h-6 text-primary fill-primary mx-auto mb-2" />
              <p className="text-foreground font-medium">Both partners joined!</p>
              <p className="text-muted-foreground text-sm">Answer the questions together</p>
              <Button
                onClick={() => window.location.reload()}
                size="sm"
                className="gradient-romantic text-primary-foreground shadow-romantic hover:shadow-glow transition-all"
              >
                New Couples Quiz
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 bg-card/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground truncate">
          {qrUrl}
        </p>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            navigator.clipboard.writeText(qrUrl);
          }}
          className="shrink-0"
        >
          Copy
        </Button>
      </div>


      {/* Scan status */}
      {/* <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${scannedCount >= 1 ? 'bg-primary' : 'bg-muted'} transition-colors`} />
        <div className={`w-3 h-3 rounded-full ${scannedCount >= 2 ? 'bg-primary' : 'bg-muted'} transition-colors`} />
        <span className="text-muted-foreground text-sm font-medium ml-2">
          {scannedCount}/2 partners joined
        </span>
      </div> */}

      {scannedCount === 0 && (
        <p className="text-center text-muted-foreground text-sm max-w-xs">
          Scan this QR code with your partner to start your love compatibility test 💕
        </p>
      )}
    </div>
  );
};

export default QRCodeDisplay;
