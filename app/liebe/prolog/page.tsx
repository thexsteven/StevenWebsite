import { Breadcrumb } from '@/components/Breadcrumb';
import { LoveGuard } from '@/components/LoveGuard';
import { LoveStoryPager } from '@/components/LoveStoryPager';

export default function LoveProlog() {
  return (
    <>
      <section className="story-hero" aria-label="Prolog · 2015">
        <div className="story-hero-media">
          <img
            src="https://res.cloudinary.com/dozdjb4fi/image/upload/f_auto,q_auto,w_1600/v1776617887/IMG_0973_hgtoic.heic"
            srcSet="
              https://res.cloudinary.com/dozdjb4fi/image/upload/f_auto,q_auto,w_800/v1776617887/IMG_0973_hgtoic.heic 800w,
              https://res.cloudinary.com/dozdjb4fi/image/upload/f_auto,q_auto,w_1280/v1776617887/IMG_0973_hgtoic.heic 1280w,
              https://res.cloudinary.com/dozdjb4fi/image/upload/f_auto,q_auto,w_1920/v1776617887/IMG_0973_hgtoic.heic 1920w,
              https://res.cloudinary.com/dozdjb4fi/image/upload/f_auto,q_auto,w_2560/v1776617887/IMG_0973_hgtoic.heic 2560w
            "
            sizes="100vw"
            alt=""
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="story-hero-overlay" aria-hidden="true" />
        <div className="story-hero-content">
          <h1 className="story-hero-title">Wo alles begann</h1>
          <p className="story-hero-sub">Story of Adelina &amp; Steven</p>
        </div>
      </section>

      <section className="story-detail" aria-label="Privater Inhalt">
        <Breadcrumb href="/#love-story" label="← Zurück zur Übersicht" />
        <LoveGuard chapter="prolog" />
        <LoveStoryPager currentSlug="prolog" />
      </section>
    </>
  );
}
