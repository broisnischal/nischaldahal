import { Link } from "react-router";
import type { Route } from "./+types/image-details";
import { images } from "./blogs";

export default function ImageDetailsRoute({ params }: Route.ComponentProps) {
  return (
    <div className="image-detail">
      <Link to="/" viewTransition>
        Back
      </Link>
      <h1>Image Number {params.id}</h1>
      <img src={images[Number(params.id)]} />
    </div>
  );
}
