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
        // setShift("");
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
    <div className="flex">
      <form onSubmit={submitGamePresenter}>
        <FormControl
          sx={{ m: 1, minWidth: 120 }}
          variant="standard"
          onSubmit={submitGamePresenter}
        >
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mr-2"
          />
          <Button type="submit">Add Presenter</Button>
        </FormControl>
      </form>
      <br />
    </div>
  );
}
