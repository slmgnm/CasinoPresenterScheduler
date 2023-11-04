"use client";

type ToggleProps = {
  deletePresenter: () => void;
  setDeleteToggle: (deleteToggle: boolean) => void;
};

export default function Toggle({
  deletePresenter,
  setDeleteToggle,
}: ToggleProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setDeleteToggle(false);
      }}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0 "
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">
          Are you sure you want to delete this Presenter?
        </h2>
        <h3 className="text-red-600 text-sm">
          Clicking the delete button will permenantly delete your presenter
        </h3>
        <button
          onClick={deletePresenter}
          className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Remove presenter
        </button>
      </div>
    </div>
  );
}
