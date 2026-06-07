import SmallElementSpinner from "../../others/SmallElementSpinner";

export default function UserSkeletonCard() {
  return (
    <div className="w-48 h-12 bg-gray-200 animate-pulse rounded-md relative">
      <SmallElementSpinner />
    </div>
  );
}
