"use client";

import { useState, useRef } from "react";
import Toggle from "./Toggle";
import EditToggle from "./EditToggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { Avatar, Divider, Typography } from "@mui/material";

type presenterProps = {
  id: string;
  name: string;
};

export default function Presenter({ name, id }: presenterProps) {
  const [deleteToggle, setDeleteToggle] = useState(false);

  const queryClient = useQueryClient();
  const deleteToastIDRef = useRef<string>("");

  // Define a mutation for deleting a presenter
  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/presenters/deletePresenter", { data: id }),
    {
      onError: (error) => {
        // Handle error as needed
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["getPresenters"]);
        toast.success("Presenter has been removed.", {
          id: deleteToastIDRef.current,
        });
        queryClient.invalidateQueries(["presenters"]);
      },
    }
  );

  const deletePresenter = () => {
    deleteToastIDRef.current = toast.loading("Deleting a presenter.", {
      id: deleteToastIDRef.current,
    });
    console.log("id in EditPost", id);
    mutate(id);
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
        {/* <div className="flex items-center space-x-2">
          <Avatar>{name?.charAt(0)}</Avatar>
          <Typography
            className="text-gray-700"
            sx={{ display: "inline" }}
            component="span"
            variant="body1"
            color="black"
          >
            {name}
          </Typography>
          <Divider variant="inset" component="li" />
        </div> */}
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </motion.div>

      {deleteToggle && (
        <Toggle
          deletePresenter={deletePresenter}
          setDeleteToggle={setDeleteToggle}
        />
      )}
    </>
  );
}
