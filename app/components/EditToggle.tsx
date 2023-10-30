import { useState } from "react";
type EditToggleProps = {
  editPresenter: (data: any) => void;
  setToggle: (toggle: boolean) => void;
  id: string;
};

export default function EditToggle({
  editPresenter,
  setToggle,
  id,
}: EditToggleProps) {
  const [updatedData, setUpdatedData] = useState<any>({
    name: "",
  });

  //   const handleEdit = (e: React.SyntheticEvent) => {
  //     e.preventDefault();
  //     editPresenter({ id, ...updatedData });
  //     setToggle(false);
  //   };
  const handleEdit = () => {
    editPresenter({ id, ...updatedData });
    setToggle(false); // Close the EditToggle
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setToggle(false);
      }}
      className="fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h2 className="text-xl">Edit Presenter Information</h2>
        <div className="mb-4">
          <label htmlFor="name" className="text-sm text-gray-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={updatedData.name}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
            className="border rounded-md p-2"
          />
        </div>

        <button
          onClick={handleEdit}
          className="bg-blue-600 text-sm text-white py-2 px-4 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
