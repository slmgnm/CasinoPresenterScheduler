"use client";

import { useState, useRef } from "react";
import Toggle from "./Toggle";
import EditToggle from "./EditToggle";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { Avatar, Divider, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type presenterProps = {
  id: string;
  name: string;
};
const EditPresenter = ({ name, id }: presenterProps) => {
  const queryClient = useQueryClient();
  const editToastIDRef = useRef("");
  const [editToggle, setEditToggle] = useState(false); // State for editing

  // Define a mutation for editing a presenter
  const { mutate } = useMutation(
    async (updatedData) => {
      return await axios.put("/api/presenters/editPresenter", updatedData);
    },
    {
      onError: (error) => {
        // Handle error as needed
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getPresenters"]);
        toast.success("Presenter has been edited.", {
          id: editToastIDRef.current,
        });
      },
    }
  );

  const editPresenter = (updatedData: any) => {
    editToastIDRef.current = toast.loading("Editing a presenter.", {
      id: editToastIDRef.current,
    });

    mutate(updatedData);
  };

  return (
    <>
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ ease: "easeOut" }}
        className="bg-white rounded-lg border border-gray-300 text-white mx-8 my-4 px-4 py-2 shadow-lg flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditToggle(true);
            }}
            className="text-sm font-bold text-blue-500"
          >
            Edit
          </button>
        </div>
      </motion.div>
      {editToggle && (
        <EditToggle
          editPresenter={editPresenter}
          setToggle={setEditToggle}
          id={id}
        />
      )}
    </>
  );
};

export default EditPresenter;
