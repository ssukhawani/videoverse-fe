import { toTimeString } from "@/lib/utils";

export default function RangeInput({
  thumbNails,
  rEnd,
  rStart,
  handleUpdaterStart,
  handleUpdaterEnd,
  loading,
  videoMeta,
}) {
  const RANGE_MAX = 100;

  if (thumbNails.length === 0 && !loading) {
    return null;
  }

  if (loading) {
    return (
      <center>
        <h2> Processing thumbnails.....</h2>
      </center>
    );
  }

  return (
    <>
      <div className="range_pack">
        <div className="image_box">
          {thumbNails.map((imgURL, id) => (
            <img src={`${import.meta.env.VITE_APP_BACKEND_MEDIA_URL}/${imgURL}`} alt={`sample_video_thumbnail_${id}`} key={id} />
          ))}

          <div
            className="clip_box"
            style={{
              width: `calc(${rEnd - rStart}% )`,
              left: `${rStart}%`,
            }}
            data-start={toTimeString(
              (rStart / RANGE_MAX) * videoMeta?.duration,
              false
            )}
            data-end={toTimeString(
              (rEnd / RANGE_MAX) * videoMeta?.duration,
              false
            )}
          >
            <span className="clip_box_des"></span>
            <span className="clip_box_des"></span>
          </div>

          <input
            className="range z-20"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterStart}
            value={rStart}
          />
          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterEnd}
            value={rEnd}
          />
        </div>
      </div>
    </>
  );
}
