"use client";
import { useState, useRef } from "react";

import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, FormControl, TextField } from "@mui/material";

export default function AddGamePresenter() {
  const [name, setName] = useState("");
  // const [shift, setShift] = useState("");

  const queryClient = useQueryClient();
  const toastGamePresenterIdRef = useRef<string | undefined>(undefined);

  const { mutate } = useMutation(
    (data: { name: string }) =>
      axios.post("/api/presenters/addPresenter", data),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
      },
      onSuccess: () => {
        toast.success("Game presenter added successfully", {
          id: toastGamePresenterIdRef.current,
        });
        queryClient.invalidateQueries(["presenters"]);
        setName("");
      },
    }
  );

  const submitGamePresenter = async (e: React.FormEvent) => {
    e.preventDefault();
    toastGamePresenterIdRef.current = toast.loading(
      "Creating your game presenter",
      {
        id: toastGamePresenterIdRef.current,
      }
    );

    mutate({ name });
  };

  return (
    <div className="flex   min-w-full  rounded-lg border border-gray-300 text-white mx-8 my-4 px-4 py-2 shadow-lg  items-center ">
      <form
        onSubmit={submitGamePresenter}
        className="flex justify-between items-center space-x-2 "
      >
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            "& .MuiInputBase-input": { color: "white" },
          }}
          variant="standard"
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2"
            sx={{ "& .MuiInputBase-input": { color: "white" } }}
          />
        </FormControl>
      <div className="flex  items-center space-x-2 mx-3 ">
        <button className="bg-gray-700 text-white text-sm px-6 py-2 rounded-md">
          Add Presenter
        </button>
      </div>
      </form>
    </div>
  );
}
