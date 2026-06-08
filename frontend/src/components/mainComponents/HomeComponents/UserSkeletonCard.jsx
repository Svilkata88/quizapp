import SmallElementSpinner from "../../others/SmallElementSpinner";

export default function UserSkeletonCard() {
  return (
    <div className="w-50 h-18 bg-gray-200 animate-pulse rounded-md relative">
      <SmallElementSpinner />
    </div>
  );
}
