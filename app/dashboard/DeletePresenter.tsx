"use client";

import { useState, useRef } from "react";
import Toggle from "../components/Toggle";
import EditToggle from "../components/EditToggle";
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
  const [editToggle, setEditToggle] = useState(false); // State for editing
  const queryClient = useQueryClient();
  const deleteToastIDRef = useRef<string>("");
  const editToastIDRef = useRef<string>("");

  // Define a mutation for deleting a presenter
  const deleteMutation = useMutation(
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
      },
    }
  );

  // Define a mutation for editing a presenter
  const editMutation = useMutation(
    async (updatedPresenterData) => {
      // Make an API call to update the presenter data
      return await axios.put(
        "/api/presenters/editPresenter",
        updatedPresenterData
      );
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

  const deletePresenter = () => {
    deleteToastIDRef.current = toast.loading("Deleting a presenter.", {
      id: deleteToastIDRef.current,
    });
    deleteMutation.mutate(id);
  };

  const editPresenter = (updatedData: any) => {
    editToastIDRef.current = toast.loading("Editing a presenter.", {
      id: editToastIDRef.current,
    });

    editMutation.mutate(updatedData);
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
        className=" mx-8 px-8 rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Avatar>{name.charAt(0)}</Avatar>
          <Typography
            sx={{ display: "inline" }}
            component="span"
            variant="body1"
            color="text.primary"
          >
            {name}
          </Typography>
          <Divider variant="inset" component="li" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDeleteToggle(true);
            }}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
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
      {deleteToggle && (
        <Toggle deletePresenter={deletePresenter} setToggle={setDeleteToggle} />
      )}
      {editToggle && (
        <EditToggle
          editPresenter={editPresenter}
          setToggle={setEditToggle}
          id={id}
        />
      )}
    </>
  );
}
