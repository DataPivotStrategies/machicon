export function EventImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full">
      <img
        src={imageUrl}
        alt="Event"
        className="w-full h-[400px] object-cover rounded-lg shadow-md"
      />
    </div>
  );
}