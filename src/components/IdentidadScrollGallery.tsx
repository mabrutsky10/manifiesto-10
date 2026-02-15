import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, MotionValue, useMotionValue } from 'framer-motion';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
}

interface IdentidadScrollGalleryProps {
  items: MediaItem[];
}

export default function IdentidadScrollGallery({ items }: IdentidadScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Preload images and videos
  useEffect(() => {
    const preloadMedia = async () => {
      const promises = items.map((item) => {
        return new Promise<void>((resolve, reject) => {
          if (item.type === 'image') {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = reject;
            img.src = item.src;
          } else {
            const video = document.createElement('video');
            video.preload = 'auto';
            video.oncanplaythrough = () => resolve();
            video.onerror = reject;
            video.src = item.src;
          }
        });
      });

      try {
        await Promise.all(promises);
        setMediaLoaded(true);
      } catch (error) {
        console.error('Error preloading media:', error);
        setMediaLoaded(true); // Continue even if some media fails
      }
    };

    preloadMedia();
  }, [items]);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const numItems = items.length;
  const totalHeight = numItems * 100; // N * 100vh

  // Calculate current item index based on scroll progress
  const itemIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, numItems - 1],
    { clamp: true }
  );

  // Get the actual index value (for display)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = itemIndex.on('change', (latest) => {
      setCurrentIndex(Math.floor(latest));
    });
    return unsubscribe;
  }, [itemIndex]);

  return (
    <div
      ref={containerRef}
      className="relative bg-near-black"
      style={{ 
        height: `${totalHeight}vh`,
        position: 'relative'
      }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full">
          {items.map((item, index) => (
            <MediaLayer
              key={index}
              item={item}
              index={index}
              numItems={numItems}
              scrollYProgress={scrollYProgress}
              isVisible={index === currentIndex}
              prefersReducedMotion={prefersReducedMotion}
              mediaLoaded={mediaLoaded}
            />
          ))}
        </div>
      </div>

      {/* Indicator */}
      <div className="fixed bottom-6 right-6 z-50 text-sm text-gray-500 font-light tracking-wider">
        {String(currentIndex + 1).padStart(2, '0')}/{String(numItems).padStart(2, '0')}
      </div>
    </div>
  );
}

interface MediaLayerProps {
  item: MediaItem;
  index: number;
  numItems: number;
  scrollYProgress: MotionValue<number>;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  mediaLoaded: boolean;
}

function MediaLayer({
  item,
  index,
  numItems,
  scrollYProgress,
  isVisible,
  prefersReducedMotion,
  mediaLoaded,
}: MediaLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Calculate opacity and scale based on scroll progress
  // Each item gets a slice of the scroll progress
  const segmentSize = 1 / numItems;
  const segmentStart = index * segmentSize;
  const segmentEnd = (index + 1) * segmentSize;
  const segmentCenter = (segmentStart + segmentEnd) / 2;
  
  // Use motion values that we'll update manually
  const opacity = useMotionValue(0);
  const scale = useMotionValue(0.95);
  
  // Update opacity and scale based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const distance = Math.abs(latest - segmentCenter);
      const maxDistance = segmentSize / 2;
      const normalizedDistance = Math.min(1, distance / maxDistance);
      
      // Calculate opacity: 1 at center, 0 at edges
      let newOpacity = 0;
      if (normalizedDistance <= 0.3) {
        newOpacity = 1;
      } else if (normalizedDistance < 1) {
        newOpacity = 1 - ((normalizedDistance - 0.3) / 0.7);
      }
      opacity.set(newOpacity);
      
      // Calculate scale: 1 at center, 0.95 at edges
      let newScale = 0.95;
      if (normalizedDistance <= 0.3) {
        newScale = 1;
      } else if (normalizedDistance < 1) {
        newScale = 1 - ((normalizedDistance - 0.3) / 0.7) * 0.05;
      }
      scale.set(newScale);
    });
    
    return unsubscribe;
  }, [scrollYProgress, segmentCenter, segmentSize, opacity, scale]);

  // Control video playback based on visibility and opacity
  useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      const video = videoRef.current;
      
      // Subscribe to opacity changes to control video playback
      const unsubscribeOpacity = opacity.on('change', (latestOpacity) => {
        if (latestOpacity > 0.5) {
          // Play video when opacity is high (visible)
          video.play().catch((error) => {
            console.error('Error playing video:', error);
          });
        } else {
          // Pause video when opacity is low (not visible)
          video.pause();
        }
      });
      
      return () => {
        unsubscribeOpacity();
        // Pause video on unmount
        video.pause();
      };
    }
  }, [item.type, opacity]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity: prefersReducedMotion ? (isVisible ? 1 : 0) : opacity,
        scale: prefersReducedMotion ? 1 : scale,
      }}
      initial={false}
    >
      {item.type === 'image' ? (
        <img
          src={item.src}
          alt=""
          className="max-w-full max-h-full w-auto h-auto object-contain"
          style={{
            opacity: mediaLoaded ? 1 : 0,
            transition: mediaLoaded ? 'opacity 0.3s ease-in' : 'none',
          }}
          loading="eager"
          aria-hidden="true"
        />
      ) : (
        <video
          ref={videoRef}
          src={item.src}
          className="max-w-full max-h-full w-auto h-auto object-contain"
          style={{
            opacity: mediaLoaded ? 1 : 0,
            transition: mediaLoaded ? 'opacity 0.3s ease-in' : 'none',
          }}
          playsInline
          muted
          loop
          preload="auto"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
