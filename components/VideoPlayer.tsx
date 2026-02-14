
import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  url: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('contextmenu', handleContextMenu);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('contextmenu', handleContextMenu);
      }
    };
  }, [url]);

  // Função para identificar e converter links do YouTube/Vimeo para embed
  const getEmbedUrl = (link: string) => {
    if (link.includes('youtube.com') || link.includes('youtu.be')) {
      const videoId = link.split('v=')[1]?.split('&')[0] || link.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (link.includes('vimeo.com')) {
      const videoId = link.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl group border border-white/10">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <video
          ref={videoRef}
          src={url}
          poster={poster}
          controls
          controlsList="nodownload"
          className="w-full h-full object-contain"
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
      
      {/* Watermark de proteção */}
      <div className="absolute bottom-4 right-6 bg-black/40 backdrop-blur-sm text-white/40 text-[9px] px-3 py-1 rounded-full select-none pointer-events-none uppercase tracking-widest font-bold">
        Lais Rastely - Conteúdo Protegido
      </div>
    </div>
  );
};

export default VideoPlayer;
