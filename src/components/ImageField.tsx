import { AspectRatio } from "./ui/aspect-ratio";

type Props = {
  imageUrl: string;
};

const ImageField = ({ imageUrl }: Props) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <img
        src={imageUrl}
        alt="storeImage"
        className="rounded-md object-cover w-full h-full"
      />
    </AspectRatio>
  );
};

export default ImageField;
