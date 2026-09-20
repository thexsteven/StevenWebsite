# Hero media

Generated with built-in Imagegen from the approved anime v3 concept and the supplied portrait. Eyes are an AI interpretation, not an authentic photograph or a verified iris color.

- `public/images/avatar/steven-tech-v2.webp`: single full-body artwork with refined facial likeness, 1024 × 1536. See `face-polish-prompt.md` for the Imagegen edit prompt; the original `steven-tech.webp` is retained.
- `public/images/avatar/steven-eyes.webp`: photographic-looking eye interpretation, 1536 × 1024.

The hero now displays the avatar and text statically. The eye intro, camera transition, floating effect, studio-light animation and pause control have all been removed. The eye image remains an unused design artifact.

## Future outfits

Pass an `AvatarOutfit` to `AvatarHero`. Each portrait uses the same 2:3 framing, with an image, ID and accessible description. No configurator, persistence or additional outfits have been implemented.

## Body generation prompt

Create a production website hero asset from the reference character sheet. ONE SINGLE full-body character only, no collage or additional views. Preserve EXACTLY the approved adult man's facial likeness, compact brown curls, beard, slender agile athletic physique, black sleeveless technical top, black tapered joggers, black sneakers, slim titanium/teal cyborg details. Premium One Piece-inspired hand-drawn anime cel shading. Front-facing head and eyes looking straight into camera with level horizontal eyes (essential for matching a later eye zoom), body nearly frontal with relaxed natural stance, both arms slightly separated, hands relaxed. Full body centered with entire hair and both soles in frame, 8 percent margin above and below. Portrait 2:3 composition. Uniform very dark charcoal #14161A seamless backdrop, subtle floor shadow only, no environmental detail, no text, no props, no stage platform. Controlled cool studio rim light and soft warm key. Render crisp high-resolution linework. Adult face matching reference, opaque fully clothed outfit, long slim limbs and modest shoulders, no bulky muscles. Do not change his outfit, add armor or make a generic anime protagonist.

## Eyes generation prompt

Photorealistic-natural website cinematic opening asset. Use the reference adult man's face as identity guidance to make an interpreted high-resolution extreme close-up of BOTH his eyes, upper nose bridge and eyebrows only. Crisp detailed natural skin, fine eyelashes, naturally heavy relaxed upper eyelids and brow shape matching reference, believable dark hazel-brown irises, calm attentive direct gaze. Reconstruct a straight eye-level camera angle rather than the low angle of reference, eyes horizontally level, both eyes symmetrically placed at x=35% and x=65%, y=50%. Wide landscape 3:2 composition. Framing forehead above brows to upper cheeks and bridge, no full nose, mouth or other scene elements. Professional dark studio lighting, gentle warm key and restrained cool edge, sharp iris details and small controlled catchlights, shadows at outer edges to blend into charcoal. Authentic natural appearance, not beautified, no hat, no cyborg parts, no anime, no glowing iris, no text, no split view. The user explicitly authorizes an AI interpretation rather than an authentic photograph; render as a photographic-looking interpretation of his eye region.
