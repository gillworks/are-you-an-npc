import { ImageResponse } from 'next/og';

export const alt = 'Are You an NPC? | Take the Quiz';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f1a',
          fontFamily: 'system-ui, -apple-system, Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: 110, lineHeight: 1 }}>🎮</div>

          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: '#ffffff',
              marginTop: 28,
              textAlign: 'center',
              letterSpacing: '-2px',
            }}
          >
            Are You an NPC?
          </div>

          <div
            style={{
              fontSize: 28,
              color: '#a1a1aa',
              marginTop: 18,
              textAlign: 'center',
            }}
          >
            10 questions. Find out how scripted your daily life really is.
          </div>

          <div
            style={{
              marginTop: 40,
              padding: '14px 40px',
              borderRadius: 50,
              background: 'linear-gradient(to right, #7c3aed, #c026d3)',
              color: '#ffffff',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Take the quiz →
          </div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            right: 48,
            fontSize: 18,
            color: '#3f3f46',
          }}
        >
          areyouannpc.com
        </div>
      </div>
    ),
    { ...size },
  );
}
